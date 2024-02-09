import gsap from "gsap";
import "./project.page.scss";
import React, { useRef } from "react";
import { LeafletMouseEvent } from "leaflet";

export interface ProjectPageModel {
  address: string;
  city: string;
  district: string;
  imgIds: string[];
  title: string;
  description: string;
  location: number[];
}

let projectPageRef: any;

function closeProject() {
  if (projectPageRef.current) {
    const projectRefWidth: number = projectPageRef.current.clientWidth;
    gsap.to("#project-page", { duration: 1, x: -projectRefWidth });
  }
}

function openProject() {
  if (projectPageRef.current) {
    const projectRefWidth: number = projectPageRef.current.clientWidth;   
    gsap.to("#project-page", { duration: 1, x: projectRefWidth });
  }
}

function ProjectPage({ project, click  }: { project: ProjectPageModel | undefined, click : LeafletMouseEvent  }) {
  projectPageRef = useRef<HTMLDivElement>(null);
  openProject()
  console.log(click);
  
  return (
    <div id="project-page"  ref={projectPageRef}>
      <div className="header">
        <div className="nav">
          <p id="city">{project?.city}</p>
          <span id="arrow">{">"}</span>
          <p id="district">{project?.district}</p>
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
          <img />
        </div>
        <div className="text-container">
          <h3 id="title" className="title">
            {project?.title}
          </h3>
          <div className="divider"></div>
          <p id="description">{project?.description} </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
