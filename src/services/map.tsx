import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngLiteral, LatLngTuple } from "leaflet";
import { FireBaseAPI } from "../api/firebase.api";
import ProjectPage, { ProjectPageModel } from "../pages/project-page/project.page";


const Map = () => {
  const mapRef = useRef(null);
  const projectPage = document.getElementById("project-page")
  const amiensLocation: LatLngLiteral = {
    lat: 49.884195,
    lng: 2.299391,
  };
  
  const [markers, setMarkers] = useState<LatLngTuple[]>([]);
  const [projects, setProjects] = useState<ProjectPageModel[]>([])
  const firebaseApi = new FireBaseAPI();

  function loadProject(location : number[])  {
    console.log(projects);
    console.log(location);
    const bla : ProjectPageModel = projects.filter(el => el.location === location)[0]
    
    return bla
  }
  useEffect(() => {
    firebaseApi.getProjects().then((data) => {
      let locations: LatLngTuple[] = [];
      data.forEach((res: any) => {
        const currLocation: LatLngTuple = [res.lat, res.long];
        if (currLocation[0] !== null && typeof currLocation[0] === "number") {
          locations.push(currLocation);
        }
      });
      const currProject : ProjectPageModel[]  = data.map((project : any) =>( {
        city : project.city, 
        address : project.address, 
        district : project.disctrict, 
        imgIds : project.imgId, 
        title : project.title, 
        description : project.description,
        location : [project.lat, project.long]
      }))
      
      setProjects(currProject)
      setMarkers(locations)
      
    });
  }, []);
  
  console.log(projects);

  return (
    <MapContainer
    center={amiensLocation}
    zoom={13}
    ref={mapRef}
    style={{ height: "100vh", width: "100vw" }}
    >
      {/* <ProjectPage /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((house, index) => (
        <Marker
          key={index}
          position={house}
          eventHandlers={{
            click: () => {
              const test : number[] = house as number[]
              
              console.log(loadProject(test));
            },
          }}
          />
          ))}
      {/* Additional map layers or components can be added here */}
    </MapContainer>
  );
};

export default Map;
