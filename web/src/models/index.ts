export type ActionType<T> = {
    type: string;
    payload?: T;
};
export interface Model<T> {
    data: T | null;
    pending: boolean;
    error: boolean;
}
