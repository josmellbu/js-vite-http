import { localhostUSerToModel } from "../mappers/localhost-users.mapper";



export const getUserById = async ( id ) => {

    const url = `${ import.meta.env.VITE_BASE_URL}/users/${ id }`
    const res = await fetch(url);
    const data = await res.json();
    const user = localhostUSerToModel( data );

    return user;
}