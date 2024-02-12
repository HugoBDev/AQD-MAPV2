import gsap from "gsap";
import "./project.page.scss";
import React, { useRef, useState } from "react";
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


function openProject() {
  if (projectPageRef.current) {
    const projectRefWidth: number = projectPageRef.current.clientWidth;   
    gsap.to("#project-page", { duration: 1, x: projectRefWidth });
  }
}

function ProjectPage({ project, isVisible, setProjectPageVisible}: { project: ProjectPageModel | undefined, isVisible :any, setProjectPageVisible: any }) {
  
  function closeProject() {
    if (projectPageRef.current) {
      const projectRefWidth: number = projectPageRef.current.clientWidth;
      gsap.to("#project-page", { duration: 1, x: -projectRefWidth })
      setProjectPageVisible(false)
    }
  }
  projectPageRef = useRef<HTMLDivElement>(null);
  if(isVisible) 
  return  
  openProject()
 
    
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
