

import { AssetType, TxnType } from '../../common/common.js'
import { addressCol, collectionCol, nftCol, transactionCol, walletCol } from '../../database/mongodb.js'
import { createTransactionHash } from '../transaction/transactionHash.js'

export async function buyNft(buyer, seller, nftAddress) {

    const buyerAddress = await walletCol.findOne({ address: buyer })
    if (buyerAddress == null) {
        throw new Error('Invalid buyer address!')
    }
    const sellerAdress = await walletCol.findOne({ address: seller })
    if (sellerAdress == null) {
        throw new Error('Invalid seller address!')
    }

    const nft = await nftCol.findOne({ address: nftAddress })
    if (nft == null) {
        throw new Error('Invalid NFT address!')
    }
    if (nft.owner !== seller) {
        throw new Error('Wrong owner of the nft!')
    }
    if (nft.price > buyerAddress.token_balance) {
        throw new Error('Insufficient token balance!')
    }
    const nftFilter = { address: nftAddress }
    const nftUpdate = { $set: { owner: buyer } }
    const buyerUpdate = { $inc: { token_balance: -nft.price } }
    const sellerUpdate = { $inc: { token_balance: nft.price } }

    const transaction = {
        "txn_type": TxnType.PURCHASE,
        "buyer": buyer,
        "seller": seller,
        "time": Date.now(),
        "details": {
          "at_price": nft.price,
          "nft_address": nftAddress,
        }
    };
    const txnHash = createTransactionHash(transaction)
    const colFilter = {
        "address" : nft.collection,
    }
    const colUpdate = {
        $push: { txn_history: { $each: [txnHash], $position: 0 } } ,
    }
    transaction["txn_hash"] = txnHash
    await collectionCol.updateOne(colFilter, colUpdate)
    await transactionCol.insertOne(transaction)
    await nftCol.updateOne(nftFilter, nftUpdate)
    await walletCol.updateOne({ address: buyer }, buyerUpdate)
    await walletCol.updateOne({ address: seller }, sellerUpdate)
}
