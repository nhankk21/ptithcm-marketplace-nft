import { collectionCol } from "../../database/mongodb";


export function isValidCollection(address){
   const res = collectionCol.findOne({
        address : address
    })
    if (res == null ) {
        return false
    }
    return true
}