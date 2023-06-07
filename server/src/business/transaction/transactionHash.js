import crypto from 'crypto';

export function createTransactionHash(transaction) {
  const serializedTransaction = JSON.stringify(transaction);
  const hash = crypto.createHash('sha256').update(serializedTransaction).digest('hex');
  return hash;
}

