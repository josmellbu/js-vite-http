import { renderTable } from "./presentation/render-table";
import { renderButtons } from "./render-buttons/render-buttons";
import userStore from "./store/user-store";

export const UsersApp = async ( element ) => {
    element.innerHTML = 'Loading...';
    await userStore.loadNextPage();
    element.innerHTML = '';
    
    renderTable( element );
    renderButtons( element );
}