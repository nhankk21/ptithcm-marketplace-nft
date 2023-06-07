import { getNewPrivateKey } from "../business/wallet/newWallet.js";
import { getNewAddress } from '../business/address/newAddress.js';
import { walletCol } from "../database/mongodb.js";
import { AssetType, isHexAddess, Status } from "../common/common.js";
import { generateToken } from "../middlewares/verifytoken.js";
import { login } from "../business/wallet/authen.js";
// import { isValidPrivateKey } from "../business/wallet/verifyPrivateKey.js";
import { hashPassword } from "../common/common.js";
import { changePassword } from '../business/wallet/authen.js';
import { transfer } from "../business/wallet/transfer.js";
import { withdraw } from "../business/wallet/withdraw.js";
import { deposit } from "../business/wallet/deposit.js";
import { exchange } from "../business/wallet/exchange.js";


export async function getNewWallet(req, res) {
    const address = getNewAddress();
    const private_key = getNewPrivateKey();
    const new_password = hashPassword(req.body.password);
    const wallet = {
        address: address,
        private_key: private_key,
        username: req.body.username,
        password: new_password,
        fiat_balance: 0,
        token_balance: 0,
        created: Date.now(),
        updated: Date.now(),
    }
    try {
        await walletCol.insertOne(wallet);
    } catch {
        res.send({
            status: Status.ERROR,
            message: "Fail to create new wallet!",
        });
    }
    res.send({
        status: Status.OK,
        message: "Create new wallet successfully!",
        data: {
            address: address,
            private_key: private_key,
            username: req.body.username,
            fiat_balance: 0,
            token_balance: 0,
        },
    });
}
export async function loginHandler(req, res) {

    if (!isHexAddess(req.body.address) || req.body.password == "") {
        res.send({
            status: Status.INVALID,
            message: "Invalid address or password!",
        });
        return
    }

    const item = await login(req.body.address, req.body.password)
    if (item == null) {
        res.send({
            status: Status.FAILED,
            message: "Login failed!",
        });
        return
    }
    res.send({
        status: Status.OK,
        message: "Login sucessfully!",
        data: {
            jwt: generateToken({ address: req.body.address }),
            address: item.address,
            fiat_balance: item.fiat_balance,
            token_balance: item.token_balance,
            username: item.username,
        }
    });
}

export async function forgotPassword(req, res) {
    const result = await changePassword(req.body.private_key, hashPassword(req.body.new_password))
    if (!result.matchedCount > 0) {
        res.send({
            status: Status.FAILED,
            message: "Fail to reset password!",
        });
        return
    }
    res.send({
        status: Status.OK,
        message: "Password has been reset!",
    });
}

export async function transferHandler(req, res) {

    if (req.body.type != AssetType.FIAT && req.body.type != AssetType.NFT && req.body.type != AssetType.TOKEN) {
        res.send({
            status: Status.INVALID,
            message: "Invalid transfer type!",
        });
        return
    }

    if (!isHexAddess(req.body.from) || !isHexAddess(req.body.to)) {
        res.send({
            status: Status.INVALID,
            message: "Invalid wallet address!",
        });
        return
    }

    if (req.body.type == AssetType.FIAT || req.body.type == AssetType.TOKEN) {
        if (req.body.amount <= 0) {
            res.send({
                status: Status.INVALID,
                message: "Invalid amount!",
            });
            return
        }

    }

    if (req.body.type == AssetType.NFT) {
        if (!isHexAddess(req.body.nft_address)) {
            res.send({
                status: Status.INVALID,
                message: "Invalid NFT address!",
            });
            return
        }
    }

    try {
        await transfer(req.body.from, req.body.to, req.body.type, req.body.amount, req.body.nft_address);
    } catch (err) {
        res.send({
            status: Status.FAILED,
            message: "Failed to transfer!",
            error: err.message,
        });
        return;
    }
    res.send({
        status: Status.OK,
        message: "Transfered successfully!",
    });
    return;
}


export async function withdrawHandler(req, res) {

    if (!isHexAddess(req.body.address)) {
        res.send({
            status: Status.INVALID,
            message: "Invalid wallet address!",
        });
        return
    }

    if (req.body.amount <= 0) {
        res.send({
            status: Status.INVALID,
            message: "Invalid amount!",
        });
        return
    }

    try {
        await withdraw(req.body.address, req.body.amount);
    } catch (err) {
        res.send({
            status: Status.FAILED,
            message: "Failed to withdraw!",
            error: err.message,
        });
        return;
    }
    res.send({
        status: Status.OK,
        message: "Withdrew successfully!",
    });
    return;
}

export async function depositHandler(req, res) {

    if (!isHexAddess(req.body.address)) {
        res.send({
            status: Status.INVALID,
            message: "Invalid wallet address!",
        });
        return
    }

    if (req.body.amount <= 0) {
        res.send({
            status: Status.INVALID,
            message: "Invalid amount!",
        });
        return
    }

    try {
        await deposit(req.body.address, req.body.amount);
    } catch (err) {
        res.send({
            status: Status.FAILED,
            message: "Failed to deposit!",
            error: err.message,
        });
        return;
    }
    res.send({
        status: Status.OK,
        message: "Deposited successfully!",
    });
    return;
}

export async function exchangeHandler(req, res) {

    if (!isHexAddess(req.body.address)) {
        res.send({
            status: Status.INVALID,
            message: "Invalid wallet address!",
        });
        return
    }
    if (req.body.exchange_to != "Token" && req.body.exchange_to != "Fiat") {
        res.send({
            status: Status.INVALID,
            message: "Only exchange Token to Fiat or Fiat to Token!",
        });
        return
    }

    if (req.body.amount <= 0) {
        res.send({
            status: Status.INVALID,
            message: "Invalid amount!",
        });
        return
    }

    try {
        await exchange(req.body.address, req.body.amount, req.body.exchange_to);
    } catch (err) {
        res.send({
            status: Status.FAILED,
            message: "Failed to exchange!",
            error: err.message,
        });
        return;
    }
    res.send({
        status: Status.OK,
        message: "Exchanged successfully!",
    });
    return;
}