import React, { Component } from "react";
import "../../styles/Pathfinding.css";
import Node from "./Node";
import PriorityQueue from "js-priority-queue";
import Dijkstra from "./algorithms/Dijkstra";
import Instruct from "../Instructions/Instruct";
import instruct_gif from "../../assets/pathfinder.gif";
import { NavLink } from "react-router-dom";
function node(row,col,dis){
    return({
        row,
        col,
        dis
    })
}

class Pathfinding extends Component{
    constructor(){
        super();
        this.state={
            method:"Algorithms",
            grid:[],
            mouseClicked:false,
            mainClicked:"",
            start_node:null,
            end_node:null,
            visited:0,
            shortestPath:0,
            number_of_nodes:0,
            algo_info:{
                "Algorithms":{
                    text:"",
                    url:""
                },
                "Dijkstra's Algorithm":{
                    text:"Dijkstra’s algorithm is very similar to Prim’s algorithm for minimum spanning tree. Like Prim’s MST, we generate a SPT (shortest path tree) with given source as root. We maintain two sets, one set contains vertices included in shortest path tree, other set includes vertices not yet included in shortest path tree. At every step of the algorithm, we find a vertex which is in the other set (set of not yet included) and has a minimum distance from the source.",
                    url:"https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/"
                },
                "A* Search":{
                    text:"Informally speaking, A* Search algorithms, unlike other traversal techniques, it has “brains”. What it means is that it is really a smart algorithm which separates it from the other conventional algorithms. This fact is cleared in detail in below sections. And it is also worth mentioning that many games and web-based maps use this algorithm to find the shortest path very efficiently (approximation).",
                    url:"https://www.geeksforgeeks.org/a-search-algorithm/"
                },
                "Breadth First Search":{
                    text:"In Progress",
                    url:"https://www.geeksforgeeks.org/a-search-algorithm/"
                }
            },
            showModal:true

        }
        this.animating=false;
    }
    
    
    makeGrid=()=>{
        if(this.animating)return;
        let row_size=Math.floor((window.innerHeight-60)/27);
        let col_size=Math.floor((window.innerWidth)/27);
        let arr=[]
        for(let i=0;i<row_size;i++){
            let row=[];
            for(let j=0;j<col_size;j++){
                row.push({
                    value:1,
                    row:i,
                    col:j,
                    isVisited:false,
                    isShortestPath:false,
                    isWall:false,
                    isShortestPath:false
                });
                try{
                document.getElementById(`node-${i}-${j}`).className="node_";
                }catch{
                }

            }
            arr.push(row);
        }
        let start_x=Math.floor(Math.random()*row_size);
        let start_y=Math.floor(Math.random()*col_size);
        let end_x=Math.floor(Math.random()*row_size);
        let end_y=Math.floor(Math.random()*col_size);
        arr[start_x][start_y].isStart=true;
        arr[end_x][end_y].isEnd=true;

        this.setState({
            grid:arr,
            start_node:[start_x,start_y],
            end_node:[end_x,end_y],
            number_of_nodes:arr.length*arr[0].length,
            visited:0,
            shortestPath:0
        })
        
    }
    componentDidMount(){
        this.makeGrid();
        window.addEventListener("resize",(e)=>{
            this.makeGrid();
        })
    }
    handleMouseDown=(row,col)=>{
        if(this.animating)return;
        let arr=this.state.grid;
        if(arr[row][col].isStart){
            this.setState({
                mainClicked:"start"
            })
        }
        else if(arr[row][col].isEnd){
            this.setState({
                mainClicked:"end"
            })
        }
        if(!arr[row][col].isWall&&!arr[row][col].isStart&&!arr[row][col].isEnd)
            arr[row][col].isWall=true;
        else if(arr[row][col].isWall){
            arr[row][col].isWall=false;
        }
        this.setState({
            grid:arr,
            mouseClicked:true
        })
    }
    handleMouseEnter=(row,col)=>{
        if(this.animating)return;
        if(this.state.mouseClicked){
            let arr=this.state.grid;
            if(this.state.mainClicked=="start"){
                arr[row][col].isStart=true;
                this.setState({
                    start_node:[row,col]
                })
            }
            else if(this.state.mainClicked=="end"){
                arr[row][col].isEnd=true;
                this.setState({
                    end_node:[row,col]
                })
            }
            else if(!arr[row][col].isWall&&!arr[row][col].isStart&&!arr[row][col].isEnd)
                arr[row][col].isWall=true;
            else if(arr[row][col].isWall){
                arr[row][col].isWall=false;
            }
            this.setState({
                grid:arr,
                mouseClicked:true
            })
        }
        
    }
    handleMouseLeave=(row,col)=>{
        if(this.animating)return;
        let arr=this.state.grid;
        if(this.state.mainClicked!=""){
            arr[row][col].isStart=0;
            arr[row][col].isEnd=0;
            this.setState({
                grid:arr
            })
        }
        
    }
    handleMouseUp=()=>{

        if(this.animating)return;
        this.setState({
            mouseClicked:false,
            mainClicked:""
        })
    }
    isInsideGrid=(i,j) =>
    { 
        return (i >= 0 && i < this.state.grid.length && j >= 0 && j < this.state.grid[0].length); 
    }
    dijkshtra=(e)=>{
        e.preventDefault();
        if(this.animating)return;
        let arr=this.state.grid;
        for(let i=0;i<arr.length;i++){
            for(let j=0;j<arr[0].length;j++){
                if(document.getElementById(`node-${i}-${j}`).className=="node_path")
                    document.getElementById(`node-${i}-${j}`).className="node_";
                if(document.getElementById(`node-${i}-${j}`).className=="node_visited"){
                    document.getElementById(`node-${i}-${j}`).className="node_";
                }
            }
        }
        
        let {visited_nodes,shortestPath}=Dijkstra(this.state.grid,this.state.start_node,this.state.end_node)
        
        const animate=async ()=>{
            
        let i=0;
        let j=0;
        this.animating=true;
        const animateVisited=()=>{
            if(i==visited_nodes.length){
                requestAnimationFrame(animatePath);
                return;
            }
            arr[visited_nodes[i].row][visited_nodes[i].col].isVisited=true;
            // this.setState({
            //     grid:arr
            // })
            if(!arr[visited_nodes[i].row][visited_nodes[i].col].isStart&&!arr[visited_nodes[i].row][visited_nodes[i].col].isEnd)
            document.getElementById(`node-${visited_nodes[i].row}-${visited_nodes[i].col}`).className="node_visited";
            ++i;
            requestAnimationFrame(animateVisited);
            // setTimeout(() => {
                
            //   }, 1000 / 1000);
        }
        
        const animatePath=()=>{
            if(j==shortestPath.length){
                this.setState({
                    grid:arr,
                    visited:visited_nodes.length,
                    shortestPath:shortestPath.length
                })
                this.animating=false;
                return;
            }
            arr[shortestPath[j].row][shortestPath[j].col].isShortestPath=true;
            
            if(!arr[shortestPath[j].row][shortestPath[j].col].isStart&&!arr[shortestPath[j].row][shortestPath[j].col].isEnd)
            document.getElementById(`node-${shortestPath[j].row}-${shortestPath[j].col}`).className="node_path";
            ++j;
            
            requestAnimationFrame(animatePath);
        }
        await requestAnimationFrame(animateVisited);
    }
    animate().then(()=>{
        
    });
    }
    toggleChat=()=>{
        var chatBody = document.getElementById("info-body");
        if(chatBody.style.display=='none') {
            
            chatBody.style.display = 'block';
            return;
        } else {
            
            chatBody.style.display = 'none';
            return;
        }
    }
    showModal = () => {
        this.setState({ 
                showModal: true
            });
      };
    
    hideModal = () => {
    this.setState({ showModal: false });
    };
    componentDidUpdate(){
        let method=this.state.method
        if(method!="Algorithms"){
            document.getElementById("info-btn").style.display="block";
        }
    }
    render(){
        return(
            <div>
                <Instruct show={this.state.showModal}>
                    <h3>How to use?</h3>
                <img className="card-img-top img-thumbnail" style={{marginBottom:"5px"}} src={instruct_gif} alt="Card image cap"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.hideModal}>Close</button>
                </Instruct>
                <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{color:"white"}}>
                    <a class="navbar-brand" href="#">Pathfinding Visualizer</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                        <li className="nav-item">
                        <NavLink exact to="/" className="nav-link">Home</NavLink>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.method}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#" onClick={()=>this.setState({method:"Dijkstra's Algorithm"})}>Dijkstra's Algorithm</a>
                                <a class="dropdown-item" href="#" onClick={()=>this.setState({method:"A* Search"})}>A* Search</a>
                                {/* <a class="dropdown-item" href="#" onClick={()=>this.setState({method:"Breath First Search"})}>Breath First Search</a> */}
                            </div>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#" onClick={()=>this.makeGrid()}>Clear <span class="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#" onClick={this.showModal}>Instructions <span className="sr-only" >(current)</span></a>
                        </li>
                        <li className="nav-item" style={{marginLeft:"10px",minWidth:"120px"}}>
                            <p className="progress-text"><span className="span-text">Visited Nodes</span>
                            <span class="comment">{this.state.visited}</span>
                            </p>
                            {/* <p class="card-text progress-text">{this.state.shortestPath}</p> */}
                            <div class="progress2 progress-moved" >
                            <div class="progress-bar2" style={{width:`${(this.state.visited/this.state.number_of_nodes)*100}%`}}></div>
                            </div>
                        </li>
                        <li className="nav-item" style={{marginLeft:"10px",minWidth:"120px"}}>
                            <p className="progress-text"><span className="span-text">Shortest Path</span>
                            <span class="comment">{this.state.shortestPath}</span></p>
                            <div class="progress2 progress-moved" >
                                <div class="progress-bar2" style={{width:`${(this.state.shortestPath/this.state.number_of_nodes)*100}%`}}></div>
                            </div>
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
                                                isWall={element.isWall}
                                                isStart={element.isStart}
                                                isEnd={element.isEnd}
                                                isVisited={element.isVisited}
                                                isShortestPath={element.isShortestPath}
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
                    <div class="chat-container">
                    <button id="info-btn" class="chat-btn" onClick={this.toggleChat}>ℹ</button>
                    <div id="info-body" class="chat-body" style={{display:"none"}}>
                    <div class="card bg-dark" style={{maxWidth: "18rem"}}>
                        <div class="card-body ">
                            <h5 class="card-title">{this.state.method}</h5>
                        <p class="card-text" style={{maxHeight:"50vh",overflow:"auto",overflowX:"hidden"}}>{this.state.algo_info[this.state.method].text}</p>
                            <a href={this.state.algo_info[this.state.method].url} target="_blank" class="card-link" style={{color:"#57A846"}}>More Info</a>
                        </div>
                    </div>
                    </div>
                    </div>
            </div>
        )
    }
}

export default Pathfinding;