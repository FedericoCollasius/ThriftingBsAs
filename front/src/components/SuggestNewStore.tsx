
import { MouseEvent } from "react";
import FormNewStore from "./FormNewStore";
import { ThriftStore } from "../../models/types";


export default function SuggestNewStore({addThriftStorePreview } : {addThriftStorePreview: (newStore: ThriftStore) => void}) {

    function closeModal(event?: MouseEvent): void {
        event?.stopPropagation();
        const modal = document.getElementById("myModal");
        if (modal) {
            modal.style.right = "-33.33%";
            setTimeout(() => {
                modal.style.visibility = "hidden";
            }, 500);
        }
    }

    function handleClickOutside(event: MouseEvent): void {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }
   
    return (
        <div id="myModal" className="modal" onClick={handleClickOutside}>
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Sugeri una feria</h2>
                <p>Asegurate de aclarar en lo posible:</p>
                <ul>
                    <li>Nombre de la feria</li>
                    <li>Direccion</li>
                    <li>Horarios</li>
                </ul>
                <FormNewStore addThriftStorePreview={addThriftStorePreview} />
            </div>
        </div>
    )
}