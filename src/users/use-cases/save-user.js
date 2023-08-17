import { localhostUSerToModel } from "../mappers/localhost-users.mapper";
import { userModelToLocalhost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/users"


export const saveUser = async ( userLike ) => {

    const user = new User( userLike );

    if ( !user.firstName || !user.lastName ) {
        throw 'First & last name are required';
    }

    const userToSave = userModelToLocalhost( user );
    let userUpdated;

    if ( user.id ) {
        userUpdated = await updateUser( userToSave)
    } else {
        userUpdated = await createUser( userToSave );
    }

    return localhostUSerToModel( userUpdated );
}

const createUser = async (user) => {
    const url = `${ import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const newUSer = await res.json();

    console.log({ newUSer });

    return newUSer;

}


const updateUser = async ( user ) => {
    const url = `${ import.meta.env.VITE_BASE_URL}/users/${ user.id }`;
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const updatedUSer = await res.json();

    return updatedUSer;

}