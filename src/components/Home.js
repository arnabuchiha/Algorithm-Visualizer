import React, { Component } from "react";
import "../styles/Home.css"
import Logo from "../assets/heading_logo.png";
import convexhull from "../assets/convex_hull.png";
import sorting from "../assets/sorting.png";
import pathfinding_front from "../assets/pathfinding_front.svg";
import {ReactComponent as Github} from "../assets/github.svg";
import {ReactComponent as LinkedIn} from "../assets/linkedin.svg";
import {ReactComponent as LogoIcon} from "../assets/analytics.svg";
class Home extends Component{
    constructor(){
        super();
        this.state={
            problems:[
                {
                    name:"Sorting",
                    imgUrl:sorting,
                    link:"/sorting"
                    
                },
                {
                    name:"Pathfinding",
                    imgUrl:pathfinding_front,
                    link:"/pathfind"
                },
                {
                    name:"ConvexHull",
                    imgUrl:convexhull,
                    link:"/convexhull"
                }
            ]
        }
    }
    componentDidMount(){
        
    //   window.particlesJS("particles-js",particleJSON );
      
    }
    render(){
        return(
            <div class="container">
                <div class="box title">
                    <div className="container-fluid solid">
                        <ul className="links">
                            <li>
                                <i>
                                    <Github/>
                                </i>
                            </li>
                            <li>
                                <i>
                                    <LinkedIn/>
                                </i>
                            </li>
                        </ul>
                        <h1 className="main-title center">
                            <div className="logo">
                            <LogoIcon/>
                            </div>
                            Algorithm <strong style={{color:"#5BC9B1"}}>Visualizer</strong>
                        </h1>
                    </div>
                </div>
                <div class="box cards stack-top">
                <ul className="list-inline mt-5" style={{display:"block",position:"relative"}}>
                     {this.state.problems.map((element,i)=>
                        <li key={i} className="list-inline-item mb-2" style={{cursor:"pointer"}} onClick={()=>window.location.href=element.link}>
                        <div className="card card1" style={{width: "14rem"}}>
                            <img className="card-img-top img-thumbnail algo-image" src={element.imgUrl} alt="Card image cap"/>
                            <div style={{overflow:"hidden"}} className="card-body">
                                <h3 className="card-text algo-name">{element.name}</h3>
                            </div>
                        </div>
                        </li>
                    )}
                </ul>
                </div>
            </div>
        )
    }
}
export default Home;