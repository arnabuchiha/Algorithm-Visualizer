import React, { Component } from "react";
import "../../styles/Pathfinding.css";
import Node from "./Node";
import PriorityQueue from "js-priority-queue";
import Dijkstra from "./algorithms/Dijkstra";
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
                row.push({
                    value:1,
                    row:i,
                    col:j,
                    isVisited:false,
                    isShortestPath:false,
                    isWall:false,
                    isShortestPath:false
                });
            }
            arr.push(row);
        }
        let start_x=Math.floor(Math.random()*row_size);
        let start_y=Math.floor(Math.random()*col_size);
        let end_x=Math.floor(Math.random()*row_size);
        let end_y=Math.floor(Math.random()*col_size);
        arr[start_x][start_y].isStart=true;
        console.log(arr[start_x][start_y].isWall)
        arr[end_x][end_y].isEnd=true;

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
        this.setState({
            mouseClicked:false,
            mainClicked:""
        })
    }
    isInsideGrid=(i,j) =>
    { 
        return (i >= 0 && i < this.state.grid.length && j >= 0 && j < this.state.grid[0].length); 
    } 
    findNode=(x)=>{
        return x.row
    }
    dijkshtra=(e)=>{
        e.preventDefault();
        console.log(Dijkstra(this.state.grid,this.state.start_node,this.state.end_node))
        let arr=this.state.grid;
        let visited_nodes=[];
        let shortestPath=[];
        let start_node=this.state.start_node;
        let end_node=this.state.end_node;
        let pq=new PriorityQueue({
            comparator:function(a,b){
                return a.distance-b.distance;
            }
        });
        for(let i=0;i<arr.length;i++){
            for(let j=0;j<arr[0].length;j++){
                arr[i][j].distance=Infinity;
                arr[i][j].prevNode=null;
                arr[i][j].isVisited=false;
                arr[i][j].isShortestPath=false;
            }
        }
        arr[start_node[0]][start_node[1]].distance=0;
        pq.queue(arr[start_node[0]][start_node[1]]);
        let dx = [1, 0, -1, 0]; 
        let dy = [0, 1, 0, -1]; 
        // console.log(set.toArray())
        let limit=0;
        
        while(pq.length){
            let cell=pq.dequeue();
            if(arr[cell.row][cell.col].isVisited)continue;
            arr[cell.row][cell.col].isVisited=true;
            visited_nodes.push(cell);
            let flag=0;
            for(let i=0;i<4;i++){
                let x=cell.row+dx[i];
                let y=cell.col+dy[i];
                if(!this.isInsideGrid(x,y))continue;
                if(!arr[x][y].isVisited&&(!arr[x][y].isWall||(x==end_node[0]&&y==end_node[1]))){
                    if(x===end_node[0]&&y===end_node[1]){
                        arr[x][y].isVisited=true;
                        arr[x][y].prevNode=arr[cell.row][cell.col];
                        let node=arr[x][y];
                        while (node !== null) {
                            shortestPath.unshift(node);
                            node = node.prevNode;
                            if (node){ node.isShortestPath = true;
                                node.isVisited=false;
                            }
                        }
                        console.log(shortestPath);
                        flag=1;
                        break;
                    }
                    const dist = Math.abs(dx[i]) === 1 && Math.abs(dy[i]) === 1 ? 1.4 : 1;
                    if (cell.distance + dist < arr[x][y].distance) {
                        arr[x][y].prevNode = cell;
                        arr[x][y].distance = cell.distance + dist;
                    }
                    pq.queue(arr[x][y]);
                }
                
            }
            if(flag==1)break;
        }
        for(let i=0;i<visited_nodes.length;i++){
            arr[visited_nodes[i].row][visited_nodes[i].col].isVisited=false
        }
        for(let i=0;i<shortestPath.length;i++){
            arr[shortestPath[i].row][shortestPath[i].col].isShortestPath=false;
            arr[visited_nodes[i].row][visited_nodes[i].col].isVisited=true;
        }
        let flag=0;
        const animate=async ()=>{
        let i=1;
        let j=1;
        const animateVisited=async()=>{
            if(i==visited_nodes.length){
                requestAnimationFrame(animatePath);
                return;
            }
            arr[visited_nodes[i].row][visited_nodes[i].col].isVisited=true;
            // this.setState({
            //     grid:arr
            // })
            document.getElementById(`node-${visited_nodes[i].row}-${visited_nodes[i].col}`).className="node_visited";
            ++i;
            requestAnimationFrame(animateVisited);
            // setTimeout(() => {
                
            //   }, 1000 / 1000);
        }
        
        const animatePath=()=>{
            if(j==shortestPath.length-1)return;
            arr[shortestPath[j].row][shortestPath[j].col].isShortestPath=true;
            document.getElementById(`node-${shortestPath[j].row}-${shortestPath[j].col}`).className="node_path";
            ++j;
            requestAnimationFrame(animatePath);
        }
        await requestAnimationFrame(animateVisited);
    }
    animate().then(()=>{
        this.setState({
            grid:arr
        })
    });
        // for(let i=0;i<visited_nodes.length;i++){

        //     setTimeout(()=>{
        //         arr[visited_nodes[i].row][visited_nodes[i].col].isVisited=true;
        //         this.setState({
        //             grid:arr
        //         })
        //         if(i==visited_nodes.length-1)flag=1;
        //     },i);
        // }
        // for(let i=0;i<shortestPath.length;i++){
        //     setTimeout(()=>{
        //     arr[shortestPath[i].row][shortestPath[i].col].isShortestPath=true;
        //     this.setState({
        //         grid:arr
        //     })
        //     },50*i);
        // }
    }
    
    getShortestPath=(node)=>{
        console.log(node)
        let shortestPath = [];
        while (node !== null) {
            shortestPath.unshift(node);
            node = node.prevNode;
            if (node) node.isShortestPath = true;
        }
        return shortestPath;
    }
    toggleChat=()=>{
        var chatBody = document.querySelector(".chat-body");
        var chatBtn = document.querySelector(".chat-btn");
        if(chatBtn.style.display=='none') {
            chatBody.style.display = 'none';
            chatBtn.style.display = 'block';
        } else {
            chatBody.style.display = 'block';
            chatBtn.style.display = 'none';
            }
    }
    render(){
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{color:"white"}}>
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
                    <button class="chat-btn" onclick={this.toggleChat}>✉︎</button>
                    <div class="chat-body">
                        <div class="chat-wrap">
                    </div>
                    </div>
                    </div>
            </div>
        )
    }
}

export default Pathfinding;