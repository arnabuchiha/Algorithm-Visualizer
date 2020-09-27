import React, { Component } from "react";
import "../styles/Home.css"
import Logo from "../assets/heading_logo.png";
import "particles.js";
import particleJSON from "../assets/particles.json";
class Home extends Component{
    constructor(){
        super();
        this.state={
            problems:[
                {
                    name:"Sorting",
                    imgUrl:"https://docs.spotfire.cloud.tibco.com/spotfire/GUID-D0DB52CC-E926-49D9-968E-BE1FD173C077-display.png",
                    link:"/sorting"
                    
                },
                {
                    name:"Pathfinding",
                    imgUrl:"https://upload.wikimedia.org/wikipedia/commons/4/4c/Pathfinding_2D_Illustration.svg",
                    link:"/pathfind"
                },
                {
                    name:"ConvexHull",
                    imgUrl:"https://www.originlab.com/fileexchange/images/355/2D_ConvexHull.png",
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