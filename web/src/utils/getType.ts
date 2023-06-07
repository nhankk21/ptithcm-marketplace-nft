/**
 *
 * @param {any} reduxAction
 * @return {string}
 */
export const getType = (reduxAction: any): string => {
    return reduxAction().type;
};
