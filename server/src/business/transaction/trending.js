import { collectionCol, nftCol, transactionCol } from "../../database/mongodb.js";


export async function trendingCollection(){

    try {
        const today = new Date();
        const threeDaysAgo = today.getTime() - 3 * 24 * 60 * 60 * 1000;
        const txnFilter = { 
          time: { $gte: threeDaysAgo },
          txn_type: "Purchase"
        };
        const items = await transactionCol.find(txnFilter).toArray();
        const nftList = items.map(item => item.details.nft_address);
        const nftFilter = { 
            address: { $in: nftList },
        };
        const nfts = await nftCol.find(nftFilter).toArray();
        const colList = nfts.map(item => item.collection);
        const distinctCollections = [...new Set(colList)];
        const colFilter = { 
            address: { $in: distinctCollections },
        };
        const cols = await collectionCol.find(colFilter).toArray();
        const sortedCols = cols.sort((a, b) => {
            const aIndex = colList.indexOf(a.address);
            const bIndex = colList.indexOf(b.address);
            return aIndex - bIndex;
        });
        const limitedCols = sortedCols.slice(0, 10);
        return limitedCols;
    } catch (error) {
        return [];
    }
}

