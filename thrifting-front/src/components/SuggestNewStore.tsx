import { useEffect } from "react";
import { MouseEvent } from "react";


export default function SuggestNewStore() {

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
                <textarea id="storyText"></textarea>
                <button id="addButton">ENVIAR</button>
            </div>
        </div>
    )
}