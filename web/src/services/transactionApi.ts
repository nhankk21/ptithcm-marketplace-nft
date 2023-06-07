import delay from "../utils/delay";
import axiosCLient from "../utils/axiosClient";

const ENDPOINT = "/wallet/";

/**
 *
 * @param {string} address
 * @param {number} amount
 */
async function deposit(address: string, amount: number) {
    try {
        const url = ENDPOINT + "deposit";
        await axiosCLient.post(
            url,
            {
                address,
                amount,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        );
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message);
        }
    }
}

/**
 *
 * @param {string} address
 * @param {number} amount
 * @param {"Token" | "Fiat"} exchange_to
 */
async function exchange(
    address: string,
    amount: number,
    // eslint-disable-next-line camelcase
    exchange_to: "Token" | "Fiat"
) {
    try {
        const url = ENDPOINT + "exchange";
        await axiosCLient.post(
            url,
            {
                address,
                amount,
                // eslint-disable-next-line camelcase
                exchange_to,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        );
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message);
        }
    }
}

const transfer = async (
    from: string,
    to: string,
    type: "Token" | "Fiat",
    amount: number
) => {
    if (amount > 0 && from && to) {
        delay(500);
        try {
            const url = ENDPOINT + "transfer";
            await axiosCLient.post(
                url,
                {
                    from,
                    to,
                    type,
                    amount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                }
            );
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }
        }
    } else {
        throw new Error("Invalid transfer value");
    }
};

export { deposit, exchange, transfer };
