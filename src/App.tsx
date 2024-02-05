import Map from "./services/map";
import { FireBaseAPI } from "./api/firebase.api";
import { useEffect, useState } from "react";
import ProjectPage, { ProjectPageModel } from "./pages/project-page/project.page";
import { Marker } from "react-leaflet";
import { LatLngLiteral, LatLngTuple } from "leaflet";

const firebaseApi = new FireBaseAPI()
function App() {




  return (
    <div>
      <Map />
      
    </div>
  );
}
//https://geocode.maps.co (geocoding api)

export default App;
