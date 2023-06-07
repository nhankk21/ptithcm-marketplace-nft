/**
 * check if address is hex address or not
 * @param {string} address
 * @return {boolean}
 */
export default function isHexAddress(address: string): boolean {
    return /^0x[0-9a-fA-F]{40}$/.test(address);
}
