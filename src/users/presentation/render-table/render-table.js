import userStore from "../../store/user-store";
import { deleteUser } from "../../use-cases/delete-user-by-id";
import { showModal } from "../render-modal/render-modal";
import "./render-table.css";

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Activate</th>
            <th>Acctions</th>
        </tr>
    `;

    const tableBody = document.createElement('tbody');
    table.append( tableHeaders, tableBody );
    return table;
}

const tableSelectListener = ( event ) => {
    const element = event.target.closest('.select-user');
    if ( !element ) return;

    const id = element.getAttribute('data-id');
    showModal( id );
}

const tableDeleteListener = async ( event ) => {
    const element = event.target.closest('.delete-user');
    if ( !element ) return;

    const id = element.getAttribute('data-id');

    try {
        await deleteUser(id);
        await userStore.reloadPage();
        document.querySelector('#current-page').innerText = userStore.getCurrentPage();
        renderTable();

    } catch (error) {
        console.log(error);
        alert('No se pudo eliminar')
    }
}

export const renderTable = ( element ) => {

    const users = userStore.getUser();

    if ( !table ) {
        table = createTable();
        element.append( table );
        table.addEventListener('click' , tableSelectListener );
        table.addEventListener('click' , tableDeleteListener );
    }

    let tableHTML = '';
    users.forEach( user => {
        tableHTML += `
            <tr>
                <td>${ user.id }</td>
                <td>${ user.balance }</td>
                <td>${ user.firstName }</td>
                <td>${ user.lastName }</td>
                <td>${ user.isActive }</td>
                <td>
                    <a href="#/" class="select-user" data-id="${ user.id }">Select</a>
                    <a href="#/" class="delete-user" data-id="${ user.id }">Detele</a>
                </td>
            </tr>
        `;
    })

    table.querySelector('tbody').innerHTML = tableHTML;

}