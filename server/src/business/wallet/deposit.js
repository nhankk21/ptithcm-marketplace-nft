import { TxnType } from '../../common/common.js';
import {transactionCol, walletCol } from '../../database/mongodb.js'
import { createTransactionHash } from '../transaction/transactionHash.js';

export async function deposit(address, amount) {
    const wallet = await walletCol.findOne({ address: address })
    if (wallet == null) {
        throw new Error('Invalid address!')
    }
    const updateFrom = { $inc: { fiat_balance: amount } }
    const transaction = {
        "txn_type": TxnType.DEPOSIT,
        "address": address,
        "time": Date.now(),
        "details": {
          "amount": amount,
        }
    };
    const txnHash = createTransactionHash(transaction)
    transaction["txn_hash"] = txnHash
    await transactionCol.insertOne(transaction)
    await walletCol.updateOne({ address: address }, updateFrom)
}
