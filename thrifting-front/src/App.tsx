import { useEffect, useState } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'

import './App.css'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import SuggestNewStore from './components/SuggestNewStore'
import loadThriftStores from './utils/loadStore'
import { ThriftStore } from '../models/types'
import { aestheticMarker } from '../models/types'
function App() {

  const [thriftStores, setThriftStores] = useState<ThriftStore[]>([]);

  useEffect(() => {
    loadThriftStores().then(setThriftStores);
    console.log(thriftStores)
  }, []);


  function openSuggestionForm(): void {
    const modal = document.getElementById("myModal");
    if (modal) {
      modal.classList.add("show");
      modal.style.right = "0";
      modal.style.visibility = "visible";
    }
  }

 function addThriftStorePreview(newStore: ThriftStore): void {
    setThriftStores([...thriftStores, newStore]);
  }



  return (
    <>
      <MapContainer center={[-34.6037, -58.3816]} zoom={13} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
        />
        {thriftStores.map((store, index) => (
          <Marker key={index} position={[store.lat, store.lng]} icon={aestheticMarker}>
            <Popup>
              <div className="popup-content">
                <h2>{store.name}</h2>
                {store.openingHours.map((hour, index) => (
                  <div key={index} className="opening-times">
                    <span className="day">{hour.day}:</span>
                    <span className="hours">{hour.hours || "CERRADO"}</span>
                  </div>
                ))}
                <p>{store.comment}</p>
                {store.instagramUrl && (
                  <a href={store.instagramUrl} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                )}
                {store.googleMapsUrl && (
                  <a href={store.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    Como llegar
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="title-container">
        <header className="site-header">
          <h1>Thrifting en Buenos Aires</h1>
          <img
            src="/images/plussign.png"
            alt="Sugeri una feria"
            id="suggest-store-btn"
            onClick={openSuggestionForm}
          />
        </header>
      </div>
      <SuggestNewStore addThriftStorePreview={addThriftStorePreview}/>



    </>
  )
}

export default App
