import React from 'react';
import './styles.css'; // Keep this import for any styling
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const fireIncidents = [
  {
    id: 1,
    title: "Apartment Building Fire",
    location: { latitude: 53.3498, longitude: -6.2603 },
    imageUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Fire1",
    newsLinks: ["https://www.rte.ie/news/", "https://www.irishtimes.com/news/"],
  },
  {
    id: 2,
    title: "Warehouse Blaze",
    location: { latitude: 53.3550, longitude: -6.2750 },
    imageUrl: "https://via.placeholder.com/150/FFA500/FFFFFF?Text=Fire2",
    newsLinks: ["https://www.independent.ie/news/", "https://www.breakingnews.ie/"],
  },
  {
    id: 3,
    title: "House Fire Incident",
    location: { latitude: 53.3400, longitude: -6.2500 },
    imageUrl: "https://via.placeholder.com/150/8B0000/FFFFFF?Text=Fire3",
    newsLinks: ["https://www.thejournal.ie/news/", "https://www.nationalgeographic.com/"],
  },
];

export default function App() {
  return (
    <div>
      <h1>FireBnB - Incident Map</h1>
      <MapContainer center={[53.3498, -6.2603]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fireIncidents.map(incident => (
          <Marker key={incident.id} position={[incident.location.latitude, incident.location.longitude]}>
            <Popup>
              <h3>{incident.title}</h3>
              <img src={incident.imageUrl} alt={incident.title} style={{ width: '100px', height: 'auto' }} />
              <ul>
                {incident.newsLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">Link {index + 1}</a>
                  </li>
                ))}
              </ul>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}