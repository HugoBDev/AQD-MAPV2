import gsap from "gsap";
import "./project.page.scss";
import React, { useRef, useState } from "react";
import { LatLngTuple } from "leaflet";
import SocialFollow from "../../components/socialMedia.component";

export interface ProjectPageModel {
  address: string;
  city: string;
  district: string;
  imgIds: string[];
  title: string;
  description: string;
  location: LatLngTuple;
}

let projectPageRef: React.RefObject<HTMLDivElement>;

function openProject() {
  if (projectPageRef.current) {
    const projectRefWidth: number = projectPageRef.current.clientWidth;
    const screenWidth: number = window.innerWidth;
    const finalXPosition: number = Math.min(0, screenWidth - projectRefWidth);
    gsap.to("#project-page", { duration: 1, x: finalXPosition });
  }
}


const ProjectPage: React.FC<{
  project: ProjectPageModel | undefined;
  isVisible: boolean;
  setProjectPageVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ project, isVisible, setProjectPageVisible }) => {
  projectPageRef = useRef<HTMLDivElement>(null);
  function closeProject() {
    if (projectPageRef.current) {
      const projectRefWidth: number = projectPageRef.current.clientWidth;
      gsap.to("#project-page", { duration: 1, x: -projectRefWidth, onComplete: () => setProjectPageVisible(false) });
    }
  }

  if (isVisible) {
    openProject();
  }


  
  return (
    <div id="project-page" ref={projectPageRef} style={{ display: isVisible ? "block" : "none" }}>
      <div className="header">
        <div className="nav">
          <p id="city">{project?.city}</p>
          <div id="arrow">{'>'}</div>
          <div id="district">{project?.district}</div>
        </div>
        <div className="close-button" onClick={closeProject}>
          X
        </div>
      </div>
      <div className="address">
        <h2 id="address">{project?.address}</h2>
      </div>
      <div className="content">
        <div className="img-container">
          <img src={project?.imgIds[0]} alt="Project" />
        </div>
        <div className="text-container">
          <h3 id="title" className="title">
            {project?.title}
          </h3>
          <div className="divider"></div>
          <p id="description">{project?.description}</p>
        </div>
      </div>
        <SocialFollow/>
    </div>
  );
};

export default ProjectPage;
