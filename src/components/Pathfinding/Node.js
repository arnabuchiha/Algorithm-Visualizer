import React, { Component } from "react";

class Node extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        const {
            value,
            isWall,
            isStart,
            isEnd,
            isVisited,
            isShortestPath,
            key,
            onMouseDown,
            row,
            col,
            onMouseEnter,
            onMouseUp,
            onMouseLeave
        }=this.props;
        const cName=isStart?"start":isEnd?"end":isWall?"wall":isShortestPath?"path":isVisited?"visited":"";
        return(
            <td className={"node_"+cName} 
            id={`node-${row}-${col}`}
            onMouseDown={()=>onMouseDown(row,col)}
            onMouseEnter={()=>onMouseEnter(row,col)}
            onMouseUp={()=>onMouseUp()}
            onMouseLeave={()=>onMouseLeave(row,col)}
            ></td>
        )
    }
}
export default Node;