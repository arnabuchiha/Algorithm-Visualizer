import React, { Component } from "react"
import {Link} from "react-router-dom";
import "../styles/Home.css"
import Logo from "../assets/heading_logo.png";
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
                }
            ]
        }
    }
    render(){
        return(
            <div >
                <img className="img-fluid mt-4" src={Logo}/>
                <ul class="list-inline mt-5">
                    {this.state.problems.map(element=>
                        <li className="list-inline-item mb-2" style={{cursor:"pointer"}} onClick={()=>window.location.href=element.link}>
                        <div className="card card1" style={{width: "14rem"}}>
                            <img className="card-img-top img-thumbnail algo-image" src={element.imgUrl} alt="Card image cap"/>
                            <div style={{overflow:"hidden",backgroundColor:"#5bc9b1"}} className="card-body">
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