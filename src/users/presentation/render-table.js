import userStore from "../store/user-store";
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

export const renderTable = ( element ) => {

    const users = userStore.getUser();

    if ( !table ) {
        table = createTable();
        element.append( table )
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
                    <a href="#/" data-id="${ user.id }">Select</a>
                    <a href="#/" data-id="${ user.id }">Detele</a>
                </td>
            </tr>
        `;
    })

    table.querySelector('tbody').innerHTML = tableHTML;

}