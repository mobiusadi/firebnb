import React, { useState, useRef } from 'react';
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
  // Dummy data for the last 20 Summer Olympics (using repeated images)
  { id: 1, title: "Athens 1896", location: { latitude: 37.9838, longitude: 23.7275 }, imageUrl: "https://static.independent.co.uk/2025/01/17/07/2025-01-17T073607Z_1232156219_RC2JBCALUFF6_RTRMADP_3_CALIFORNIA-VISTRA-FIRE.jpg", newsLinks: [] },
  { id: 2, title: "Paris 1900", location: { latitude: 48.8566, longitude: 2.3522 }, imageUrl: "https://static01.nyt.com/images/2024/07/27/lens/27xp-highway-fire/27xp-highway-fire-googleFourByThree.png", newsLinks: [] },
  { id: 3, title: "St. Louis 1904", location: { latitude: 38.6270, longitude: -90.1994 }, imageUrl: "https://ca-times.brightspotcdn.com/dims4/default/b32344c/2147483647/strip/true/crop/1920x1080+0+0/resize/1200x675!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8a%2Fba%2Fd255da624143afced5d2ff4b1873%2Fap25017410289619.jpg", newsLinks: [] },
  { id: 4, title: "London 1908", location: { latitude: 51.5074, longitude: 0.1278 }, imageUrl: "https://static.independent.co.uk/2025/01/17/07/2025-01-17T073607Z_1232156219_RC2JBCALUFF6_RTRMADP_3_CALIFORNIA-VISTRA-FIRE.jpg", newsLinks: [] },
  { id: 5, title: "Stockholm 1912", location: { latitude: 59.3293, longitude: 18.0686 }, imageUrl: "https://static01.nyt.com/images/2024/07/27/lens/27xp-highway-fire/27xp-highway-fire-googleFourByThree.png", newsLinks: [] },
  { id: 6, title: "Antwerp 1920", location: { latitude: 51.2169, longitude: 4.4003 }, imageUrl: "https://ca-times.brightspotcdn.com/dims4/default/b32344c/2147483647/strip/true/crop/1920x1080+0+0/resize/1200x675!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8a%2Fba%2Fd255da624143afced5d2ff4b1873%2Fap25017410289619.jpg", newsLinks: [] },
  { id: 7, title: "Paris 1924", location: { latitude: 48.8566, longitude: 2.3522 }, imageUrl: "https://static.independent.co.uk/2025/01/17/07/2025-01-17T073607Z_1232156219_RC2JBCALUFF6_RTRMADP_3_CALIFORNIA-VISTRA-FIRE.jpg", newsLinks: [] },
  { id: 8, title: "Amsterdam 1928", location: { latitude: 52.3676, longitude: 4.9041 }, imageUrl: "https://static01.nyt.com/images/2024/07/27/lens/27xp-highway-fire/27xp-highway-fire-googleFourByThree.png", newsLinks: [] },
  { id: 9, title: "Los Angeles 1932", location: { latitude: 34.0522, longitude: -118.2437 }, imageUrl: "https://ca-times.brightspotcdn.com/dims4/default/b32344c/2147483647/strip/true/crop/1920x1080+0+0/resize/1200x675!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8a%2Fba%2Fd255da624143afced5d2ff4b1873%2Fap25017410289619.jpg", newsLinks: [] },
  { id: 10, title: "Berlin 1936", location: { latitude: 52.5200, longitude: 13.4050 }, imageUrl: "https://static.independent.co.uk/2025/01/17/07/2025-01-17T073607Z_1232156219_RC2JBCALUFF6_RTRMADP_3_CALIFORNIA-VISTRA-FIRE.jpg", newsLinks: [] },
  { id: 11, title: "London 1948", location: { latitude: 51.5074, longitude: 0.1278 }, imageUrl: "https://static01.nyt.com/images/2024/07/27/lens/27xp-highway-fire/27xp-highway-fire-googleFourByThree.png", newsLinks: [] },
  { id: 12, title: "Helsinki 1952", location: { latitude: 60.1699, longitude: 24.9384 }, imageUrl: "https://ca-times.brightspotcdn.com/dims4/default/b32344c/2147483647/strip/true/crop/1920x1080+0+0/resize/1200x675!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8a%2Fba%2Fd255da624143afced5d2ff4b1873%2Fap25017410289619.jpg", newsLinks: [] },
  { id: 13, title: "Melbourne 1956", location: { latitude: -37.8136, longitude: 144.9631 }, imageUrl: "https://static.independent.co.uk/2025/01/17/07/2025-01-17T073607Z_1232156219_RC2JBCALUFF6_RTRMADP_3_CALIFORNIA-VISTRA-FIRE.jpg", newsLinks: [] },
  { id: 14, title: "Rome 1960", location: { latitude: 41.9028, longitude: 12.4964 }, imageUrl: "https://static01.nyt.com/images/2024/07/27/lens/27xp-highway-fire/27xp-highway-fire-googleFourByThree.png", newsLinks: [] },
  { id: 15, title: "Tokyo 1964", location: { latitude: 35.6762, longitude: 139.6503 }, imageUrl: "https://ca-times.brightspotcdn.com/dims4/default/b32344c/2147483647/strip/true/crop/1920x1080+0+0/resize/1200x675!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8a%2Fba%2Fd255da624143afced5d2ff4b1873%2Fap25017410289619.jpg", newsLinks: [] },
  { id: 16, title: "Mexico City 1968", location: { latitude: 19.4326, longitude: -99.1332 }, imageUrl: "https://static.independent.co.uk/2025/01/17/07/2025-01-17T073607Z_1232156219_RC2JBCALUFF6_RTRMADP_3_CALIFORNIA-VISTRA-FIRE.jpg", newsLinks: [] },
  { id: 17, title: "Munich 1972", location: { latitude: 48.1351, longitude: 11.5820 }, imageUrl: "https://static01.nyt.com/images/2024/07/27/lens/27xp-highway-fire/27xp-highway-fire-googleFourByThree.png", newsLinks: [] },
  { id: 18, title: "Montreal 1976", location: { latitude: 45.5017, longitude: -73.5673 }, imageUrl: "https://ca-times.brightspotcdn.com/dims4/default/b32344c/2147483647/strip/true/crop/1920x1080+0+0/resize/1200x675!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8a%2Fba%2Fd255da624143afced5d2ff4b1873%2Fap25017410289619.jpg", newsLinks: [] },
  { id: 19, title: "Moscow 1980", location: { latitude: 55.7558, longitude: 37.6173 }, imageUrl: "https://static.independent.co.uk/2025/01/17/07/2025-01-17T073607Z_1232156219_RC2JBCALUFF6_RTRMADP_3_CALIFORNIA-VISTRA-FIRE.jpg", newsLinks: [] },
  { id: 20, title: "Los Angeles 1984", location: { latitude: 34.0522, longitude: -118.2437 }, imageUrl: "https://static01.nyt.com/images/2024/07/27/lens/27xp-highway-fire/27xp-highway-fire-googleFourByThree.png", newsLinks: [] },
];

function App() {
  const [activeIncidentId, setActiveIncidentId] = useState(null);
  const [highlightedMarkerId, setHighlightedMarkerId] = useState(null);
  const mapRef = useRef(null);
  const markerRefs = useRef({});

  const handleMarkerClick = (incidentId) => {
    setActiveIncidentId(incidentId);
    setHighlightedMarkerId(incidentId);
  };

  const handleCardClick = (incidentId) => {
    setHighlightedMarkerId(incidentId);
  };

  const handleCardDoubleClick = (incidentId) => {
    const map = mapRef.current;
    const selectedIncident = fireIncidents.find(incident => incident.id === incidentId);
    if (map && selectedIncident) {
      map.flyTo([selectedIncident.location.latitude, selectedIncident.location.longitude], 15);
    }
  };

  const markerStyle = (incidentId) => {
    return highlightedMarkerId === incidentId ? { color: 'red', fontSize: '24px' } : {};
  };

  return (
    <div>
      <h1>Olympic Venues</h1>
      <MapContainer
        center={[0, 0]} // Center on the world map initially
        zoom={2}
        style={{ height: '500px', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fireIncidents.map(incident => (
          <Marker
            key={incident.id}
            position={[incident.location.latitude, incident.location.longitude]}
            ref={ref => (markerRefs.current[incident.id] = ref)}
            icon={new L.DivIcon({
              className: 'custom-marker',
              html: `<div style="${Object.keys(markerStyle(incident.id)).map(key => `${key}: ${markerStyle(incident.id)[key]};`).join('')}">📍</div>`,
              iconSize: [20, 20],
            })}
          >
            <Popup
              onOpen={() => handleMarkerClick(incident.id)}
              onClose={() => setHighlightedMarkerId(null)}
            >
              <h3>{incident.title}</h3>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '20px', padding: '10px' }}>
        {fireIncidents.map(incident => (
          <div
            key={incident.id}
            style={{
              border: highlightedMarkerId === incident.id ? '2px solid red' : '1px solid #ccc',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleCardClick(incident.id)}
            onDoubleClick={() => handleCardDoubleClick(incident.id)}
          >
            <h3>{incident.title}</h3>
            <img src={incident.imageUrl} alt={incident.title} style={{ width: '100%', height: 'auto', marginBottom: '5px' }} />
            <p>Location: {incident.location.latitude.toFixed(2)}, {incident.location.longitude.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;