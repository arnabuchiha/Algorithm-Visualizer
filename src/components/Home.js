import React, { Component } from "react";
import "../styles/Home.css"
import Logo from "../assets/heading_logo.png";
import convexhull from "../assets/convex_hull.png";
import sorting from "../assets/sorting.png"
import "particles.js";
import particleJSON from "../assets/particles.json";
import pathfinding_front from "../assets/pathfinding_front.svg";
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
        
      window.particlesJS("particles-js",particleJSON );
      
    }
    render(){
        return(
            <div className="back">
              <img className="img-fluid mt-4 logo" src={Logo}/>
                    <div id="particles-js"></div>
                
                <ul class="list-inline mt-5" style={{display:"block",position:"relative"}}>
                    {this.state.problems.map(element=>
                        <li className="list-inline-item mb-2" style={{cursor:"pointer"}} onClick={()=>window.location.href=element.link}>
                        <div className="card card1" style={{width: "14rem"}}>
                            <img className="card-img-top img-thumbnail algo-image" src={element.imgUrl} alt="Card image cap"/>
                            <div style={{overflow:"hidden",backgroundColor:"#eeeeee"}} className="card-body">
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