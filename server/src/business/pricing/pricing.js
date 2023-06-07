import { nftCol, transactionCol } from "../../database/mongodb.js";

export async function getPrice() {
    try {
        const now = new Date();
        const oneHourAgo = now.getTime() - 1 * 60 * 60 * 1000;
        const filter = {
            "txn_type": "Purchase",
            "time": { $gte: oneHourAgo },
        };
        const count = await transactionCol.countDocuments(filter);
        const n = count || 0
        return 2 + Math.log10((1.005 ** n) / 10);
    } catch (error) {
        return 0; 
    }
}

export async function getListPrice() {
    try {
      const now = new Date();
      const twentyFourHoursAgo = now.getTime() - 24 * 60 * 60 * 1000;
      const prices = [];
  
      for (let i = 0; i < 24; i++) {
        const timeAgo = twentyFourHoursAgo + i * 60 * 60 * 1000;
        const filter = {
          "txn_type": "Purchase",
          "time": { $gte: timeAgo, $lt: timeAgo + 60 * 60 * 1000 },
        };
        const count = await transactionCol.countDocuments(filter);
        const price = 2 + Math.log10((1.005 ** count) / 10);
        prices.push(price);
      }
      return prices;
    } catch (error) {
      return Array(24).fill(0);
    }
}

export async function getNFTPrice(nftAddress) {
    try {
        const nft = await nftCol.findOne({ address: nftAddress })
        if (nft == null) {
            throw new Error('Invalid NFT address!')
        }
        const txnFilter = {
            txn_type : "Pricing",
            nft_address : nftAddress,
        }
        const txns = await transactionCol.find(txnFilter).sort({ time: -1 }).limit(10).toArray()
        const newPrices = txns.map((item) => item.details.new_price);
        const reversedPrices = newPrices.reverse();
        return reversedPrices;
    } catch (error) {
        throw error
    }
}
  




/**
 * n = 0 => 1
 * n = 1 => 1.0021660617565078
 * n = 2 => 1.0043321235130152 
 * n = 3 => 1.006498185269523
 * n = 5 => 1.010830308782538
 * n = 10 => 1.0216606175650762
 * n = 20 => 1.0433212351301524
 * n = 50 => 1.1083030878253814
 * n = 100 => 1.216606175650763
 */