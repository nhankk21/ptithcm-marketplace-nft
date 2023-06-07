import { AssetType, TxnType } from '../../common/common.js'
import { addressCol, collectionCol, nftCol, transactionCol, walletCol } from '../../database/mongodb.js'
import { createTransactionHash } from '../transaction/transactionHash.js'

export async function transfer(from, to, type, amount, nftAddress) {

  const fromAddress = await walletCol.findOne({ address: from })
  if (fromAddress == null) {
      throw new Error('Invalid from address!')
  }
  const toAdress = await walletCol.findOne({ address: to })
  if (toAdress == null) {
      throw new Error('Invalid to address!')
  }
  // transfer NFT
  if (type == AssetType.NFT) {
    const nft = await nftCol.findOne({ address: nftAddress })
    if (nft == null) {
      throw new Error('Invalid NFT address!')
    }
    if (nft.owner !== from) {
      throw new Error('Wrong owner of the nft!')
    }
    const nftFilter = { address: nftAddress }
    const nftUpdate = { $set: { owner: to } }
    const transaction = {
      "txn_type": TxnType.TRANSFER,
      "from": from,
      "to": to,
      "time": Date.now(),
      "details": {
        "transfer_type": AssetType.NFT,
        "nft_address": nftAddress,
      }
    };
    const txnHash = createTransactionHash(transaction)
    transaction["txn_hash"] = txnHash
    const colFilter = {
      "address" : nft.collection,
    }
    const colUpdate = {
      $push: { txn_history: { $each: [txnHash], $position: 0 } } ,
    }
    await collectionCol.updateOne(colFilter, colUpdate)
    await transactionCol.insertOne(transaction)
    await nftCol.updateOne(nftFilter, nftUpdate)
  } else {
    const wallet = await walletCol.findOne({ address: from })
    const wAmount =
      type == AssetType.TOKEN ? wallet.token_balance : wallet.fiat_balance
    const updateFrom =
      type == AssetType.TOKEN
        ? { $inc: { token_balance: -amount } }
        : { $inc: { fiat_balance: -amount } }
    const updateTo =
      type == AssetType.TOKEN
        ? { $inc: { token_balance: amount } }
        : { $inc: { fiat_balance: amount } }
    if (wAmount < amount) {
      throw new Error('Invalid amount!')
    }
    const transaction = {
      "txn_type": TxnType.TRANSFER,
      "from": from,
      "to": to,
      "time": Date.now(),
      "details": {
        "transfer_type": type,
        "amount": amount,
      }
    };
    const txnHash = createTransactionHash(transaction)
    transaction["txn_hash"] = txnHash
    await transactionCol.insertOne(transaction)
    await walletCol.updateOne({ address: to }, updateTo)
    await walletCol.updateOne({ address: from }, updateFrom)
  }
}
