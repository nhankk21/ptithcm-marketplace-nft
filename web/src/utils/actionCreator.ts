export default (type: string, payload: any = {}) => ({
    type,
    payload,
    action: true,
});
