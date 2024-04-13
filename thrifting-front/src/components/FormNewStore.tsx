import React, { useState } from 'react';
import { ThriftStore } from '../../models/types';

const initialFormState = {
  name: '',
  lng: '',
  lat: '',
  openingHours: [{ day: '', hours: '' }],
  instagramUrl: '',
  googleMapsUrl: '',
};

function MyForm({addThriftStorePreview } : {addThriftStorePreview: (newStore: ThriftStore) => void}) {
  const [form, setForm] = useState(initialFormState);
  const [address, setAddress] = useState('');

  const handleInputChange = (event: { target: { name: string; value: string; }; }) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleOpeningHoursChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target;
    const list = [...form.openingHours];
    list[index] = { ...list[index], [name]: value };
    setForm({ ...form, openingHours: list });
  };

  const handleAddClick = () => {
    setForm({ ...form, openingHours: [...form.openingHours, { day: '', hours: '' }] });
  };

  const handleAddressSearch = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
    const data = await response.json();
    if (data && data.length > 0) {
      setForm({
        ...form,
        lat: data[0].lat,
        lng: data[0].lon,
      });
      console.log('Coordinates:', { lat: data[0].lat, lon: data[0].lon });
      addThriftStorePreview({ ...form, lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
    } else {
      console.log('No results found');
    }
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleInputChange} placeholder="Name" />
      <input name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Search Address" />
      <button onClick={handleAddressSearch}>Find Coordinates</button>
      <input name="lng" value={form.lng} readOnly placeholder="Longitude" />
      <input name="lat" value={form.lat} readOnly placeholder="Latitude" />
      <input name="instagramUrl" value={form.instagramUrl} onChange={handleInputChange} placeholder="Instagram URL" />
      <input name="googleMapsUrl" value={form.googleMapsUrl} onChange={handleInputChange} placeholder="Google Maps URL" />
      {form.openingHours.map((x, i) => {
        return (
          <div key={i}>
            <input name="day" value={x.day} onChange={(e) => handleOpeningHoursChange(e, i)} placeholder="Day" />
            <input name="hours" value={x.hours} onChange={(e) => handleOpeningHoursChange(e, i)} placeholder="Hours" />
          </div>
        );
      })}
      <button type="button" onClick={handleAddClick}>Add New Opening Hours</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;