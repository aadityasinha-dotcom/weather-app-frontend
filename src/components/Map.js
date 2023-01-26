import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css';
import "leaflet/dist/images/marker-shadow.png"

export default function Map({ data, zoom, temperature }) {

  /*const markers = position.map((position, index) => (
    <Marker key={index} position={position} />
  ));*/

  return (
    <MapContainer center={[21.250000,	81.629997]} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((d, i) => (
        <Marker key={i} position={[d.lat, d.lng]}>
          <Popup open={false}>
            {d.label}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
