import "./project.page.scss"

export interface ProjectPageModel {
  adress: string;
  city: string;
  district: string;
  imgIds: string[];
  title: string;
  description: string;
}

const ProjectPage = ({ project }: { project: ProjectPageModel }) => {
  return (
    <div id="project-page" className="hidden-project-page">
      <div className="header">
        <div className="nav">
          <p id="city">{project.city}</p>
          <span id="arrow">{">"}</span>
          <p id="district">{project.district}</p>
        </div>
        <div className="close-button">X</div>
      </div>
      <div className="address">
        <h2 id="address">{project.adress}</h2>
      </div>
      <div className="content">
        <div className="img-container">
          <img
            className="front-img"
            src="https://firebasestorage.googleapis.com/v0/b/aqd-map-17674.appspot.com/o/1702419999915?alt=media&token=af2c17bd-1e9f-4e96-a8d7-5c438e96a713"
            alt="image test"
          />
        </div>
        <div className="text-container">
          <h3 id="title" className="title">
            {project.title}
          </h3>
          <div className="divider"></div>
          <p id="description">{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
