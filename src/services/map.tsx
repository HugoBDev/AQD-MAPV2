import  { useEffect, useRef, useState } from "react";
import { MapContainer, MapContainerProps, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngLiteral, LatLngTuple } from "leaflet";
import { FireBaseAPI } from "../api/firebase.api";

const Map = () => {
  const mapRef = useRef(null);

  const amiensLocation : LatLngLiteral = {
    lat : 49.884195,
    lng : 2.299391
  }

  const [markers, setMarkers] = useState<LatLngTuple[]>([])
  const firebaseApi = new FireBaseAPI()

  useEffect(() => {
firebaseApi.getProjects()
.then((data) => {
  let locations : LatLngTuple[] = []

  data.forEach((res : any) => {
    const currLocation : LatLngTuple = [
     res.lat, 
     res.long  
    ]
    if(currLocation[0] !== null && typeof currLocation[0] === "number"){

      locations.push(currLocation)
    }
  })
  setMarkers(locations)
  console.log(locations)
  
  
})
},[])

  return ( 
    // Make sure you set the height and width of the map container otherwise the map won't show
      <MapContainer center={amiensLocation} zoom={13} ref={mapRef} style={{height: "100vh", width: "100vw"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((house, index) => (
        <Marker key={index} position={house} />
      ) )}
        {/* Additional map layers or components can be added here */}
      </MapContainer>
  );
}

export default Map;