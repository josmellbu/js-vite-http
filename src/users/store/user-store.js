import { loadUsersByPage } from "../use-cases/load-users-by-page"

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async() => {
    const users = await loadUsersByPage( state.currentPage +1 );

    if ( users.length === 0 ) return;

    state.currentPage += 1;
    state.users = users
}

const loadPreviusPage = async() => {
    const users = await loadUsersByPage( state.currentPage -1 );

    if (users.length === 0) return;
    if (state.currentPage === 1) return;

    state.currentPage -= 1;
    state.users = users;
}

const onUserChanged = () => {
    
}

const reloadPage = async() => {
    
}

export default {
    loadNextPage,
    loadPreviusPage,
    onUserChanged,
    reloadPage,

    getUser: () => [...state.users],
    getCurrentPage: () => state.currentPage,
    }