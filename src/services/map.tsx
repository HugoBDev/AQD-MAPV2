import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngLiteral, LatLngTuple, LeafletMouseEvent } from "leaflet";
import { FireBaseAPI } from "../api/firebase.api";
import ProjectPage, { ProjectPageModel } from "../pages/project-page/project.page";


const Map = () => {
  

  function loadProject(location: LatLngTuple): ProjectPageModel | undefined {
    return projects.find(project => project.location[0] === location[0] && project.location[1] === location[1]);
  }
  const mapRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState<ProjectPageModel | undefined>(undefined);

  const amiensLocation: LatLngLiteral = {
    lat: 49.884195,
    lng: 2.299391,
  };
  
  const [markers, setMarkers] = useState<LatLngTuple[]>([]);
  const [projects, setProjects] = useState<ProjectPageModel[]>([])
  const firebaseApi = new FireBaseAPI();


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
  

let clickEvent : LeafletMouseEvent;

  return (
    <MapContainer
    center={amiensLocation}
    zoom={13}
    ref={mapRef}
    style={{ height: "100vh", width: "100vw" }}
    >
    <ProjectPage project={selectedProject} click={clickEvent} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((house, index) => (
        <Marker
          key={index}
          position={house}
          eventHandlers={{
            click: (click) => {
              const project = loadProject(house);
               setSelectedProject(project);
               clickEvent = click
               console.log(clickEvent);
               console.log("isclicked");
               
               
               
               
              
            },
          }}
          />
          ))}
      {/* Additional map layers or components can be added here */}
    </MapContainer>
  );
};

export default Map;
