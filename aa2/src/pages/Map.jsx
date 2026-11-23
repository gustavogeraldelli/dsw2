import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { places } from '../data/places';
import { DEFAULT_LOCATION } from '../location';
import MapCard from '../components/MapCard';

const placeIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function Map({ coordinates, onLocation }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [popups, setPopups] = useState([]);
  const [status, setStatus] = useState('');
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    const map = L.map(containerRef.current, {
      minZoom: 2,
      maxZoom: 19,
      worldCopyJump: true
    }).setView([-22.015, -47.89], 13);
    mapRef.current = map;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const positions = [];
    const popupContainers = [];
    for (const place of places) {
      const position = [place.latitude, place.longitude];
      positions.push(position);
      const container = document.createElement('div');
      L.marker(position, { icon: placeIcon }).addTo(map).bindPopup(container, {
        maxWidth: 240,
        maxHeight: Math.min(360, map.getSize().y - 80)
      });
      popupContainers.push({ place, container });
    }
    setPopups(popupContainers);
    map.fitBounds(positions, { padding: [30, 30], maxZoom: 14 });

    return () => {
      map.remove();
      mapRef.current = null;
      userMarkerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || coordinates === DEFAULT_LOCATION) {
      return;
    }

    const position = [coordinates.latitude, coordinates.longitude];
    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(position);
    }
    else {
      userMarkerRef.current = L.circleMarker(position, {
        radius: 8,
        color: '#326080',
        fillOpacity: 1
      }).addTo(map).bindPopup('Sua localização');
    }

    map.setView(position, 15);
    userMarkerRef.current.openPopup();
  }, [coordinates]);

  function requestLocation() {
    if (!navigator.geolocation) {
      setStatus('Este navegador não oferece geolocalização.');
      return;
    }

    setStatus('Buscando sua localização...');
    setLocating(true);
    navigator.geolocation.getCurrentPosition(position => {
      onLocation(position);
      setStatus('');
      setLocating(false);
    }, error => {
      setStatus(error.code === 1
        ? 'Permissão de localização negada. Você pode continuar explorando o mapa.'
        : 'Não foi possível obter sua localização. Tente novamente.');
      setLocating(false);
    }, { timeout: 10000 });
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 p-4">
      <section className="my-6 rounded-lg bg-bora-light p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-bora sm:text-3xl">Mapa</h1>
        <p className="mt-3">Encontre os lugares no mapa e veja os detalhes de cada um.</p>
      </section>
      <button id="find-location" type="button" onClick={requestLocation} disabled={locating} className="mb-4 rounded-lg bg-bora px-4 py-2 font-bold text-white">
        Minha localização
      </button>
      <div id="map" ref={containerRef} className="rounded-lg border border-gray-200"></div>
      <p id="map-status" className="mt-2 text-sm">{status}</p>
      {/* O React renderiza cada card dentro do recipiente de popup criado pelo Leaflet. */}
      {popups.map(popup => createPortal(<MapCard place={popup.place} />, popup.container, popup.place.id))}
    </main>
  );
}
