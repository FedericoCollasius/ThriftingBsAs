

import L from "leaflet";
import "leaflet-providers";

export type OpeningHours = {
    day: string;
    hours?: string;
  };
  
export   type ThriftStore = {
    name: string;
    lat: number;
    lng: number;
    openingHours: OpeningHours[];
    instagramUrl?: string;
    googleMapsUrl?: string;
    comment?: string; // TBT
  };
  
export const aestheticMarker = L.icon({
    iconUrl: "/images/marker.png",
    iconSize: [60, 65], // size of the icon
    iconAnchor: [30, 50], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
  });

  





  
