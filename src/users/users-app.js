import { renderTable } from "./presentation/render-table/render-table";
import { renderButtons } from "./presentation/render-buttons/render-buttons";
import userStore from "./store/user-store";
import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderModal } from "./presentation/render-modal/render-modal";
import { saveUser } from "./use-cases/save-user";

export const UsersApp = async ( element ) => {
    element.innerHTML = 'Loading...';
    await userStore.loadNextPage();
    element.innerHTML = '';
    
    renderTable( element );
    renderButtons( element );
    renderAddButton( element );
    renderModal( element, async (userLike ) => {
        const user = await saveUser( userLike );
        userStore.onUserChanged( user );
        renderTable();
    } );
   
}