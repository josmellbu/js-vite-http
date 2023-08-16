/**
 * 
 * @param {Number} page 
 * @returns 
 */

import { localhostUSerToModel } from "../mappers/localhost-users.mapper";


/**
 * 
 * @param {Number} page 
 * @returns {Promise<User[]>}
 */

export const loadUsersByPage = async ( page = 1 ) => {
    const url = `${ import.meta.env.VITE_BASE_URL}/users?_page=${ page }`
    const res = await fetch(url);
    const data = await res.json();
    const users = data.map( localhostUSerToModel );

    return users;
}