import React, { Component } from "react";
import "../styles/Home.css"
import Logo from "../assets/heading_logo.png";
import convexhull from "../assets/convex_hull.png";
import sorting from "../assets/sorting.png"
import "particles.js";
import particleJSON from "../assets/particles.json";
import pathfinding_front from "../assets/pathfinding_front.svg";
import {ReactComponent as Github} from "../assets/github.svg";
import {ReactComponent as LinkedIn} from "../assets/linkedin.svg";
import {ReactComponent as LogoIcon} from "../assets/analytics.svg";
import bar from "../assets/bar-chart.svg";
import graph from "../assets/graph.svg";
import convex from "../assets/convex.svg";
class Home extends Component{
    constructor(){
        super();
        this.state={
            problems:[
                {
                    name:"Sorting",
                    imgUrl:bar,
                    link:"/sorting"
                    
                },
                {
                    name:"Pathfinding",
                    imgUrl:graph,
                    link:"/pathfind"
                },
                {
                    name:"ConvexHull",
                    imgUrl:convex,
                    link:"/convexhull"
                }
            ]
        }
    }
    componentDidMount(){
        
      window.particlesJS("particles-js",particleJSON );
      
    }
    render(){
        return(
            <div className="back">
                <div id="particles-js"></div>
              <div class="box title">
                    <div className="container-fluid solid">
                        <ul className="links">
                            <li onClick={()=>window.open("https://github.com/arnabuchiha/Algorithm-Visualizer","_blank")}>
                                <i>
                                    <Github/>
                                </i>
                            </li>
                            <li onClick={()=>window.open("https://www.linkedin.com/in/funky-poseidon/","_blank")}>
                                <i>
                                    <LinkedIn/>
                                </i>
                            </li>
                        </ul>
                        
                    </div>
                </div>
                    
                <h1 className="main-title center">
                            <div className="logo">
                            <LogoIcon/>
                            </div>
                            ALGORITHM <strong style={{color:"var(--home-color)"}}><br></br>VISUALIZER</strong>
                </h1>
                <div>
                    <p className="description-title center">
                    Algorithm Visualizer is an interactive online platform that visualizes algorithms from code.
                    Currently these include Sorting, Pathfind and ConvexHull Algorithms.
                    More Algorithms will be coming soon!!
                    </p>
                </div>
                <ul class="list-inline mt-5" style={{display:"block",position:"relative"}}>
                    {this.state.problems.map(element=>
                        <li className="list-inline-item ml-5 mr-5 mb-2" style={{cursor:"pointer"}} onClick={()=>window.location.href=element.link}>
                        <div className="card" style={{width: "14rem"}}>
                            <img className="card-img-top img algo-image" src={element.imgUrl} alt="Card image cap"/>
                            <div style ={{backgroundColor:"transparent"}} className="card-body">
                                <h3 className="card-text algo-name">{element.name}</h3>
                            </div>
                        </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
export default Home;