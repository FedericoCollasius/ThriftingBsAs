import { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet";
import "./App.css";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import SuggestNewStore from "./components/SuggestNewStore";
import loadThriftStores from "./utils/loadStore";
import { ThriftStore } from "../models/types";
import { aestheticMarker } from "../models/types";
import { Icon, IconOptions, LatLngExpression } from "leaflet";
import { DrawerDialogDemo } from "./components/DrawerDialog";
import RippedPaperPNG from "/images/Ripped-Paper-PNG.png";

function App() {
  const [thriftStores, setThriftStores] = useState<ThriftStore[]>([]);

  const ClickableMarker = ({
    position,
    children,
    icon,
  }: {
    position: LatLngExpression;
    children: React.ReactNode;
    icon: Icon<IconOptions>;
  }) => {
    const map = useMap();

    return (
      <Marker
        position={position}
        icon={icon}
        eventHandlers={{
          click: () => {
            map.flyTo(position, 16);
          },
        }}
      >
        {children}
      </Marker>
    );
  };

  useEffect(() => {
    loadThriftStores().then(setThriftStores);
    console.log(thriftStores);
  }, []);

  function addThriftStorePreview(newStore: ThriftStore): void {
    setThriftStores([...thriftStores, newStore]);
  }

  return (
    <>
      <SuggestNewStore addThriftStorePreview={addThriftStorePreview} />
      <nav>
        <div className=" flex justify-end">
          <header className="site-header">
            <h1
              className="text-3xl font-bold text-center bg-contain bg-center bg-no-repeat  mt-12 bg-origin-content "
              style={{
                backgroundImage: `url(${RippedPaperPNG})`,
              }}
            >
              <p className="transform -rotate-2 w-1/3">Thrifting en Buenos Aires</p>
            </h1>
          </header>
          <DrawerDialogDemo className="absolute bottom-0 w-full rounded-none bg-stone-800 text-5xl p-2 font-thrifting text-thrifting border-none hover:bg-stone-950 hover:text-thrifting" />
        </div>
      </nav>
      <section>
        <MapContainer
          center={[-34.6037, -58.3816]}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            className="z-0"
            url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
          />
          {thriftStores.map((store, index) => (
            <ClickableMarker
              key={index}
              position={[store.lat, store.lng]}
              icon={aestheticMarker}
            >
              <Popup>
                <div className="popup-content font-thrifting">
                  <h2>{store.name}</h2>
                  {store.openingHours.map((hour, index) => (
                    <div key={index} className="opening-times">
                      <span className="day">{hour.day}:</span>
                      <span className="hours">{hour.hours || "CERRADO"}</span>
                    </div>
                  ))}
                  <p>{store.comment}</p>
                  {store.instagramUrl && (
                    <a
                      href={store.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  )}
                  {store.googleMapsUrl && (
                    <a
                      href={store.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Como llegar
                    </a>
                  )}
                </div>
              </Popup>
            </ClickableMarker>
          ))}
        </MapContainer>
      </section>
    </>
  );
}

export default App;
