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
            key,
            onMouseDown,
            row,
            col,
            onMouseEnter,
            onMouseUp
        }=this.props;
        const cName=value==5?"start":value==10?"end":value==100?"wall":"";
        return(
            <td className={"node_"+cName} 
            id={`node-${row}-${col}`}
            onMouseDown={()=>onMouseDown(row,col)}
            onMouseEnter={()=>onMouseEnter(row,col)}
            onMouseUp={()=>onMouseUp()}
            ></td>
        )
    }
}
export default Node;