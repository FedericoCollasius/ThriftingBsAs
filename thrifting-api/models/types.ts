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

export type SuggestStoreRequest = {
    email: string;
    store :  ThriftStore;
  };

export  enum StoreColumns {
    ID = "id",
    STORE_NAME = "name",
    USER_NAME = "user_name",
    LAT = "lat",
    LNG = "lng",
    OPENING_HOURS = "opening_hours",
    INSTAGRAM_URL = "instagram_url",
    GOOGLE_MAPS_URL = "google_maps_url",
    
  }