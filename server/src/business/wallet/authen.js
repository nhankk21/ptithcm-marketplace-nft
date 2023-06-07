import { walletCol } from "../../database/mongodb.js";
import { hashPassword } from "../../common/common.js";

/**
 * login by wallet address and password
 * @param {string} wallet 
 * @param {string} password 
 * @return {Promise<Object>} find account in db with address and hashed password
 */
export async function login(wallet, password) {
  return walletCol.findOne({ address: wallet, password: hashPassword(password) })
}

export function changePassword(key, new_password) {
  const filter = {
    private_key: key,
  };

  const update = { $set: { password: new_password } };
  return walletCol.updateOne(filter, update);
}