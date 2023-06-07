/**
 *
 * @param {number | undefined} time
 */
export default async function delay(time: number | undefined = 1000) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
