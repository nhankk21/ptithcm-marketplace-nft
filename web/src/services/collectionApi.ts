import delay from "../utils/delay";
import { Collection } from "../models/collection/typings";
import { Nft } from "../models/nft";
import axiosCLient from "../utils/axiosClient";

const ENDPOINT = "/collection/";

/**
 * return collection by address
 * @param {string} collectionAddress
 * @return {Promise<Collection>}
 */
async function getCollectionMetadata(
    collectionAddress: string
): Promise<Collection> {
    const url = ENDPOINT + collectionAddress;
    try {
        const { data }: { data: Collection } = await axiosCLient.get(url);
        return data;
    } catch (e: any) {
        throw new Error("Get collection failed!", e);
    }
}

/**
 * @getCollectionListByCategory
 * @param {string} category collection category want to get
 * @param {number} page page number
 * @return {Promise<Collection[]>}
 */
async function getCollectionListByCategory(
    category: string,
    page: number
): Promise<Collection[]> {
    const url = ENDPOINT + "category/" + category + "?limit=4&page=" + page;
    try {
        const { data }: { data: Collection[] } = await axiosCLient.get(url);
        return data;
    } catch (e: any) {
        throw new Error("Get collection failed!", e);
    }
}

/**
 *
 * @param {string} creator
 * @param {string} title
 * @param {string} description
 * @param {string} category
 * @param {string} thumbnail
 * @param {number} rate
 * @return {Promise<any>}
 */
async function postNewCollection(
    creator: string,
    title: string,
    description: string,
    category: string,
    thumbnail: string,
    rate: number
): Promise<any> {
    const url = ENDPOINT + "create";
    try {
        const res = await axiosCLient.post(
            url,
            {
                creator,
                title,
                description,
                category,
                thumbnail,
                rate,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        );
        return res;
    } catch (e: any) {
        throw new Error("Get collection failed!", e);
    }
}

/**
 * return nft list by collection address
 * @param {string} collectionAddress
 * @param {number | undefined} page
 * @return {Promise<Nft[]>}
 */
async function getNftListByCollection(
    collectionAddress: string,
    page?: number
): Promise<Nft[]> {
    const url =
        ENDPOINT +
        collectionAddress +
        "/list_nft?page=" +
        (page || 1) +
        "&limit=4";
    try {
        const res = await axiosCLient.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        await delay(500);
        return res.data as Nft[];
    } catch (e: any) {
        throw new Error("Get nfts failed!", e);
    }
}

/**
 * return list collection of user
 * @param {string} address
 * @return {Promise<Collection[]>}
 */
async function getCollectionListByUserAddress(
    address: string
): Promise<Collection[]> {
    const url = ENDPOINT + "user/" + address;
    try {
        const { data }: { data: Collection[] } = await axiosCLient.get(url);
        return data;
    } catch (e: any) {
        throw new Error("Get collections failed!", e);
    }
}

export {
    getCollectionMetadata,
    getCollectionListByCategory,
    postNewCollection,
    getNftListByCollection,
    getCollectionListByUserAddress,
};
