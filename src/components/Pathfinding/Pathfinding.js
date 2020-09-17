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
            mouseClicked:false,
            mainClicked:"",
            start_node:null,
            end_node:null

        }
    }
    
    
    makeGrid=()=>{

        let row_size=Math.floor((window.innerHeight-60)/27);
        let col_size=Math.floor((window.innerWidth)/27);
        let arr=[]
        for(let i=0;i<row_size;i++){
            let row=[];
            for(let j=0;j<col_size;j++){
                row.push(1);
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
            grid:arr,
            start_node:[start_x,start_y],
            end_node:[end_x,end_y]
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
        if(arr[row][col]==5){
            this.setState({
                mainClicked:"start"
            })
        }
        else if(arr[row][col]==10){
            this.setState({
                mainClicked:"end"
            })
        }
        if(arr[row][col]!=1000&&arr[row][col]!=5&&arr[row][col]!=10)
            arr[row][col]=1000;
        else if(arr[row][col]==1000){
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
            if(this.state.mainClicked=="start"){
                arr[row][col]=5;
                this.setState({
                    start_node:[row,col]
                })
            }
            else if(this.state.mainClicked=="end"){
                arr[row][col]=10;
                this.setState({
                    end_node:[row,col]
                })
            }
            else if(arr[row][col]!=1000&&arr[row][col]!=5&&arr[row][col]!=10)
                arr[row][col]=1000;
            else if(arr[row][col]==1000){
                arr[row][col]=0;
            }
            this.setState({
                grid:arr,
                mouseClicked:true
            })
        }
        
    }
    handleMouseLeave=(row,col)=>{
        let arr=this.state.grid;
        if(this.state.mainClicked!=""){
            arr[row][col]=0;

        }
        this.setState({
            grid:arr
        })
    }
    handleMouseUp=()=>{
        this.setState({
            mouseClicked:false,
            mainClicked:""
        })
    }
    dijkshtra=()=>{
        let set1=new Set();
        set1.add(4);
        set1.add(2);
        set1.add(9);
        console.log(set1);
        let arr=this.state.grid;
        let distance=new Array();
        let start_node=this.state.start_node;
        let end_node=this.state.end_node;
        for(let i=0;i<arr.length;i++){
            let row_dist=[]
            for(let j=0;j<arr[0].length;j++){
                row_dist.push(Infinity);
            }
            distance.push(row_dist);
        }
        distance[start_node[0]][start_node[1]]=0;
        // console.log(distance)
        let set=new Set();
        // set.add({start_node[0],[start_node[1],})

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
                        <a class="nav-link" href="#" onClick={()=>this.makeGrid()}>Clear <span class="sr-only">(current)</span></a>
                        </li>
                        <div id="error" class="alert alert-danger" style={{marginLeft:"10px",display:"none"}} role="alert">
                            Select an algorithm first!
                        </div>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.dijkshtra}>Find Path</button>
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
                                                onMouseLeave={(row,col)=>this.handleMouseLeave(row,col)}
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