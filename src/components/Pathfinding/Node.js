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
            onMouseUp,
            onMouseLeave
        }=this.props;
        const cName=value==5?"start":value==10?"end":value==1000?"wall":"";
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