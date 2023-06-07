/**
 *
 * @param {string} content the string input
 * @param {number} len number of letter want to limit
 * @return {string}
 */
export function stringMinify(content: string, len: number = 20): string {
    if (!content) return content;
    return content.length > len ? content.slice(0, len) + "..." : content;
}
