import React from 'react';
import './styles.css';
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
    imageUrl: "https://static.independent.co.uk/2025/01/17/07/2025-01-17T073607Z_1232156219_RC2JBCALUFF6_RTRMADP_3_CALIFORNIA-VISTRA-FIRE.jpg", // Apartment fire
    newsLinks: ["https://www.rte.ie/news/", "https://www.irishtimes.com/news/"],
  },
  {
    id: 2,
    title: "Warehouse Blaze",
    location: { latitude: 53.3550, longitude: -6.2750 },
    imageUrl: "https://static01.nyt.com/images/2024/07/27/lens/27xp-highway-fire/27xp-highway-fire-googleFourByThree.png", // Warehouse fire
    newsLinks: ["https://www.independent.ie/news/", "https://www.breakingnews.ie/"],
  },
  {
    id: 3,
    title: "House Fire Incident",
    location: { latitude: 53.3400, longitude: -6.2500 },
    imageUrl: "https://ca-times.brightspotcdn.com/dims4/default/b32344c/2147483647/strip/true/crop/1920x1080+0+0/resize/1200x675!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8a%2Fba%2Fd255da624143afced5d2ff4b1873%2Fap25017410289619.jpg", // House fire
    newsLinks: ["https://www.thejournal.ie/news/", "https://www.nationalgeographic.com/"],
  },
  // Feel free to add more incidents with similar imageUrls
];

function App() {
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px', padding: '20px' }}>
        {fireIncidents.map(incident => (
          <div key={incident.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{incident.title}</h3>
            <img src={incident.imageUrl} alt={incident.title} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
            <p>Location: {incident.location.latitude}, {incident.location.longitude}</p>
            <div>
              <strong>News & Reports:</strong>
              <ul>
                {incident.newsLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">Link {index + 1}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;