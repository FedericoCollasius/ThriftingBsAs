/// <reference types="leaflet" />

type OpeningHours = {
  day: string;
  hours?: string;
};

type ThriftStore = {
  name: string;
  lat: number;
  lng: number;
  openingHours: OpeningHours[];
  instagramUrl?: string;
  googleMapsUrl?: string;
  comment?: string; // TBT
};

var aestheticMarker = L.icon({
  iconUrl: "/images/marker.png",
  iconSize: [60, 65], // size of the icon
  iconAnchor: [30, 50], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
});

const map: L.Map = L.map("mapid").setView([-34.6037, -58.3816], 13);

L.tileLayer.provider("Stadia.StamenWatercolor").addTo(map);

async function loadThriftStores(): Promise<ThriftStore[]> {
  const response = await fetch("thriftstores.json");
  const data: ThriftStore[] = await response.json();
  return data;
}

function formatOpeningHours(hours: OpeningHours[]): string {
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

function formatComment(comment?: string): string {
  return comment ? `<div class="store-comment">${comment}</div>` : "";
}

function addExternalLinks(
  instagramUrl: string | undefined,
  googleMapsUrl: string | undefined
): string {
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
  thriftStores.forEach((store: ThriftStore) => {
    const popupContent = `
          <div class="popup-content">
            <h2>${store.name}</h2>
            ${formatOpeningHours(store.openingHours)}
            ${formatComment(store.comment)}
            ${addExternalLinks(store.instagramUrl, store.googleMapsUrl)}
          </div>
        `;
    const marker: L.Marker = L.marker([store.lat, store.lng], {
      icon: aestheticMarker,
    }).addTo(map);
    marker.bindPopup(popupContent);
  });
});

function openSuggestionForm(): void {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.classList.add("show");
    modal.style.right = "0";
    modal.style.visibility = "visible";
  }
}

function closeModal(): void {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.style.right = "-33.33%";
    setTimeout(() => {
      modal.style.visibility = "hidden";
    }, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const span = document.getElementsByClassName("close")[0] as HTMLElement;
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
