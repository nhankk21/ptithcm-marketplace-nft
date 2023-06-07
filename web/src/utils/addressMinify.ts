/**
 *
 * @param {string} address
 * @return {string}
 */
export default function addressMinify(address: string): string {
    return address.slice(0, 5) + "..." + address.slice(-4);
}
