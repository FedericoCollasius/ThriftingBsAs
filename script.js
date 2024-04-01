"use strict";
/// <reference types="leaflet" />
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var aestheticMarker = L.icon({
  iconUrl: "/images/marker.png",
  iconSize: [60, 65], // size of the icon
  iconAnchor: [30, 50], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
});
const map = L.map("mapid").setView([-34.6037, -58.3816], 13);
L.tileLayer.provider("Stadia.StamenWatercolor").addTo(map);
function loadThriftStores() {
  return __awaiter(this, void 0, void 0, function* () {
    const response = yield fetch("thriftstores.json");
    const data = yield response.json();
    return data;
  });
}
function formatOpeningHours(hours) {
  return hours
    .map(
      (hour) => `
        <div class="opening-times">
          <span class="day">${hour.day}:</span>
          <span class="hours">${hour.hours || "CERRADO"}</span>
        </div>
      `
    )
    .join("");
}
function formatComment(comment) {
  return comment ? `<div class="store-comment">${comment}</div>` : "";
}
function addExternalLinks(instagramUrl, googleMapsUrl) {
  let linksHtml = '<div class="links-container">';
  if (googleMapsUrl) {
    linksHtml += `<a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer">Como llegar</a>`;
  }
  if (instagramUrl) {
    linksHtml += `<a href="${instagramUrl}" target="_blank" rel="noopener noreferrer">Instagram</a>`;
  }
  linksHtml += "</div>";
  return linksHtml;
}
loadThriftStores().then((thriftStores) => {
  thriftStores.forEach((store) => {
    const popupContent = `
          <div class="popup-content">
            <h2>${store.name}</h2>
            ${formatOpeningHours(store.openingHours)}
            ${formatComment(store.comment)}
            ${addExternalLinks(store.instagramUrl, store.googleMapsUrl)}
          </div>
        `;
    const marker = L.marker([store.lat, store.lng], {
      icon: aestheticMarker,
    }).addTo(map);
    marker.bindPopup(popupContent);
  });
});
function openSuggestionForm() {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.classList.add("show");
    modal.style.right = "0";
    modal.style.visibility = "visible";
  }
}
function closeModal() {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.style.right = "-33.33%"; // Slide out
    setTimeout(() => {
      modal.style.visibility = "hidden";
    }, 500);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    closeModal();
  };
  window.onclick = function (event) {
    const modal = document.getElementById("myModal");
    if (modal && event.target == modal) {
      closeModal();
    }
  };
});
