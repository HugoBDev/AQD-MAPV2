import  { useRef } from "react";
import { MapContainer, MapContainerProps, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngLiteral } from "leaflet";


const Map = () => {
  const mapRef = useRef(null);
  const amiensLocation : LatLngLiteral = {
    lat : 49.884195,
    lng : 2.299391
  }

  return ( 
    // Make sure you set the height and width of the map container otherwise the map won't show
      <MapContainer center={amiensLocation} zoom={13} ref={mapRef} style={{height: "100vh", width: "100vw"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={amiensLocation}/>
        {/* Additional map layers or components can be added here */}
      </MapContainer>
  );
};

export default Map;