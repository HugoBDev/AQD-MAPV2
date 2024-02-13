import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { FireBaseAPI } from "../api/firebase.api";
import ProjectPage, {
  ProjectPageModel,
} from "../pages/project-page/project.page";

const Map: React.FC = () => {
  const mapRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState<
    ProjectPageModel | undefined
  >(undefined);
  const [markers, setMarkers] = useState<LatLngTuple[]>([]);
  const [projects, setProjects] = useState<ProjectPageModel[]>([]);
  const [projectPageVisible, setProjectPageVisible] = useState<boolean>(false);
  const firebaseApi = new FireBaseAPI();

  useEffect(() => {
    firebaseApi.getProjects().then((data) => {
      let locations: LatLngTuple[] = [];
      const currProjects: ProjectPageModel[] = data.map((project: any) => ({
        city: project.city,
        address: project.address,
        district: project.district,
        imgIds: project.imgId,
        title: project.title,
        description: project.description,
        location: [project.lat, project.long],
      }));
      setProjects(currProjects);
      data.forEach((res: any) => {
        const currLocation: LatLngTuple = [res.lat, res.long];
        if (currLocation[0] !== null && typeof currLocation[0] === "number") {
          locations.push(currLocation);
        }
      });
      setMarkers(locations);
    });
  }, []);

  function loadProject(location: LatLngTuple): ProjectPageModel | undefined {
    return projects.find(
      (project) =>
        project.location[0] === location[0] &&
        project.location[1] === location[1]
    );
  }


  return (
    <MapContainer
      center={[49.884195, 2.299391]}
      zoom={13}
      ref={mapRef}
      style={{ height: "100vh", width: "100vw" }}
    >
      <ProjectPage
        project={selectedProject}
        isVisible={projectPageVisible}
        setProjectPageVisible={setProjectPageVisible}
      />
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
              const project = loadProject(house);
              setSelectedProject(project);
              setProjectPageVisible(true);
            },
          }}
        />
      ))}
    </MapContainer>
  );
};

export default Map;
