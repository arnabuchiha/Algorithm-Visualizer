import React, { Component } from "react";
import "../../styles/Pathfinding.css";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Node from "./Node";
const GridContainer = withStyles({
    root: {
      width: "100%",
      padding: "1vw",
      marginRight: "1vw"
    }
  })(Card);
class Pathfinding extends Component{
    constructor(){
        super();
        this.state={
            method:"Algorithms",
            grid:[],
            mouseClicked:false

        }
    }
    
    
    makeGrid=()=>{

        let row_size=Math.floor((window.innerHeight-60)/27);
        let col_size=Math.floor((window.innerWidth)/27);
        let arr=[]
        for(let i=0;i<row_size;i++){
            let row=[];
            for(let j=0;j<col_size;j++){
                row.push(0);
            }
            arr.push(row);
        }
        let start_x=Math.floor(Math.random()*row_size);
        let start_y=Math.floor(Math.random()*col_size);
        let end_x=Math.floor(Math.random()*row_size);
        let end_y=Math.floor(Math.random()*col_size);
        arr[start_x][start_y]=5;
        arr[end_x][end_y]=10;
        this.setState({
            grid:arr
        })
        
    }
    componentDidMount(){
        this.makeGrid();
        window.addEventListener("resize",(e)=>{
            this.makeGrid();
        })
    }
    handleMouseDown=(row,col)=>{
        let arr=this.state.grid;
        if(arr[row][col]!=100&&arr[row][col]!=5&&arr[row][col]!=10)
            arr[row][col]=100;
        else if(arr[row][col]==100){
            arr[row][col]=0;
        }
        this.setState({
            grid:arr,
            mouseClicked:true
        })
    }
    handleMouseEnter=(row,col)=>{
        
        if(this.state.mouseClicked){
            let arr=this.state.grid;
            if(arr[row][col]!=100&&arr[row][col]!=5&&arr[row][col]!=10)
                arr[row][col]=100;
            else if(arr[row][col]==100){
                arr[row][col]=0;
            }
            this.setState({
                grid:arr,
                mouseClicked:true
            })
        }
        
    }
    handleMouseUp=()=>{
        this.setState({
            mouseClicked:false
        })
    }
    render(){
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Pathfinding Visualizer</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                        
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.method}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#" onClick={()=>this.setState({method:"Dijkstra's Algorithm"})}>Dijkstra's Algorithm</a>
                                <a class="dropdown-item" href="#" onClick={()=>this.setState({method:"A* Search"})}>A* Search</a>
                                <a class="dropdown-item" href="#" onClick={()=>this.setState({method:"Breath First Search"})}>Breath First Search</a>
                            </div>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Clear <span class="sr-only">(current)</span></a>
                        </li>
                        <div id="error" class="alert alert-danger" style={{marginLeft:"10px",display:"none"}} role="alert">
                            Select an algorithm first!
                        </div>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.sortFunc}>Find Path</button>
                        </form>
                    </div>
                    </nav>
                    <table>
                        {
                        this.state.grid.map((row,index)=>{
                            return(
                                <tr style={{display:"table-row"}}>
                                    {
                                        row.map((element,i)=>{
                                            return(
                                                <Node 
                                                value={element}
                                                key={i}
                                                row={index}
                                                col={i}
                                                onMouseDown={(row,col)=>this.handleMouseDown(row,col)}
                                                onMouseEnter={(row,col)=>this.handleMouseEnter(row,col)}
                                                onMouseUp={()=>this.handleMouseUp()}
                                                />
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                        }
                    </table>
              
            </div>
        )
    }
}

export default Pathfinding;