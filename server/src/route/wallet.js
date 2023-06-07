
import { depositHandler, exchangeHandler, forgotPassword, getNewWallet, loginHandler, transferHandler, withdrawHandler} from "../handler/wallet.js";
import { verifyToken } from "../middlewares/verifytoken.js";


export function walletRouter(app) {

    // public apis
    app.post("/wallet/create", (req, res) => {
        getNewWallet(req, res);
    });
    app.post("/wallet/login", (req, res) => {
        loginHandler(req, res);
    });
    app.post("/wallet/forgot_password", (req, res) => {
        forgotPassword(req,res);
     });

    // private apis 
    app.post("/wallet/transfer",(req, res) => {
        transferHandler(req,res);
     });
    app.post("/wallet/withdraw", verifyToken,(req, res) => {
        withdrawHandler(req,res);
    });
    app.post("/wallet/deposit", verifyToken ,(req, res) => {
        depositHandler(req,res);
    });
    app.post("/wallet/exchange",verifyToken, (req, res) => {
        exchangeHandler(req,res);
    });
}
