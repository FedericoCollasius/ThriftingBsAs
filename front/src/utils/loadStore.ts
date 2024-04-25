import { OpeningHours, ThriftStore } from "../../models/types";

export default async function loadThriftStores(): Promise<ThriftStore[]> {
    const response = await fetch("data/thriftstores.json");
    const data: ThriftStore[] = await response.json();
    return data;
}

export function formatOpeningHours(hours: OpeningHours[]): string {
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

export function formatComment(comment?: string): string {
    return comment ? `<div class="store-comment">${comment}</div>` : "";
}

export function addExternalLinks(
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