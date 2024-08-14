import {getCookie} from "cookies-next";

/**
 * Returns the userid from the login cookie.
 *
 * @return number | null: The user_id or null if the cookie is not set.
 */
export function getUserIdFromCookie(): number | null {
    const token = getCookie('userData');

    if (token === null || token === undefined) {
        return null;
    }


    return JSON.parse(decodeURI(token)).userId;
}

export function getUsernameFromCookie(): string | null {
    const token = getCookie('userData');

    if (token === null || token === undefined) {
        return null;
    }


    return JSON.parse(decodeURI(token)).username;
}