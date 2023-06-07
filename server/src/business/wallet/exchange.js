import { AssetType, TxnType } from '../../common/common.js';
import {
  addressCol,
  nftCol,
  transactionCol,
  walletCol,
} from '../../database/mongodb.js';
import { getPrice } from '../pricing/pricing.js';
import { createTransactionHash } from '../transaction/transactionHash.js';

export async function exchange(address, amount, exchange_to) {
  const wallet = await walletCol.findOne({ address: address });
  if (wallet == null) {
    throw new Error('Invalid address!');
  }
  const wAmount =
    exchange_to == 'Fiat' ? wallet.token_balance : wallet.fiat_balance;
  const price = await getPrice();
  if (price <= 0) {
    throw new Error('No pricing data!');
  }
  const rate = exchange_to == 'Fiat' ? price : 1.0 / price;
  const update =
    exchange_to == 'Fiat'
      ? {
          $inc: {
            token_balance: -amount,
            fiat_balance: amount * rate,
          },
        }
      : {
          $inc: {
            token_balance: amount * rate,
            fiat_balance: -amount,
          },
        };
  if (wAmount < amount) {
    throw new Error('Invalid amount!');
  }
  const transaction = {
    txn_type: TxnType.EXCHANGE,
    address: address,
    time: Date.now(),
    details: {
      exchange_to: exchange_to,
      at_price: price,
      amount: amount,
    },
  };
  const txnHash = createTransactionHash(transaction);
  transaction['txn_hash'] = txnHash;
  await transactionCol.insertOne(transaction);
  await walletCol.updateOne({ address: address }, update);
}
