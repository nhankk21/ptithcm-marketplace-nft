import { nftCol, transactionCol } from "../../database/mongodb.js"


export async function historyNft(nftAddress, page, limit){
    const nft = await nftCol.findOne({ address: nftAddress })
    if (nft == null) {
      throw new Error('Invalid NFT address!')
    }
    const filter = {
        "details.nft_address": nftAddress
    }
    const sortOrder = { time: -1 };
    return transactionCol.find(filter).skip(page * limit - limit).limit(limit).sort(sortOrder).toArray()
}