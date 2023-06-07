export const getKeys = (formObj) => Object.keys(formObj);
export const initValues = (formObj, initObj = {}) => getKeys(formObj).reduce((acc, key) => ({ ...acc, [key]: initObj[key] ?? '' }), {})