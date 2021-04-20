import React, { Component } from "react";
import '../../styles/Sorting.css';
import { motion } from "framer-motion";
import selectionSort from "./algorithms/SelectionSort";
import mergeSort from "./algorithms/MergeSort";
import quickSort from "./algorithms/QuickSort";
import { NavLink } from "react-router-dom";
const springAnim = {
    type: "spring",
    damping: 20,
    stiffness: 300
};
class Sorting extends Component{
    constructor(){
        super();
        this.state={
            arr:[],
            method:"Algorithms",
            length:0,
            compare:{
                i:null,
                j:null
            },
            sorted:[],
            speed:100
        }

    }
    createArray=(e=Math.floor(window.innerWidth/50)/2)=>{
        let arr=[];
        for(let i=0;i<e;i++){
            arr.push({
                value:Math.floor(Math.random() * ((window.innerHeight/4)-30+1))+30,
                id:"id-"+i
            })
        }
        this.setState({
            arr:arr,
            length:e,
            sorted:[],
            compare:{

            }
        })
    }
    changeArray=(e)=>{
        this.createArray(e.target.value)
    }
    componentDidMount(){
        this.createArray();
        window.addEventListener("resize",(e)=>{
            this.createArray();
        })
    }
    randomize=()=>{
        this.createArray(this.state.length)
    }
    sortFunc=(e)=>{
        e.preventDefault();
        var arr=this.state.arr;
        let length=this.state.arr.length;
        var results=[]
        document.getElementById('error').style="display:none";
        if(this.state.method=="Algorithms"){
            document.getElementById('error').style="display:block";
        }
        else{
            if(this.state.method=="Selection Sort")
                results=selectionSort(arr,length);
            else if(this.state.method=="Merge Sort")
                results=mergeSort(arr,length);
            else if(this.state.method=="Quick Sort")
                results=quickSort(arr,length);
            for(let i=0;i<results.length;i++){
                setTimeout(()=>{
                    this.setState({
                        arr:results[i]
                    })
                },this.state.speed*i)
            }
        }

    }

    changeSpeed=(e)=>{
        this.setState({
            speed:1100-e.target.value
        })
    }
    render(){
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Sorting</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                        <li className="nav-item">
                        <NavLink exact to="/" className="nav-link">Home</NavLink>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link" href="#" onClick={this.randomize}>Randomize <span class="sr-only">(current)</span></a>
                        </li>
                        
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.method}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#" onClick={()=>this.setState({method:"Selection Sort"})}>Selection Sort</a>
                                <a class="dropdown-item" href="#" onClick={()=>this.setState({method:"Merge Sort"})}>Merge sort</a>
                                <a class="dropdown-item" href="#" onClick={()=>this.setState({method:"Quick Sort"})}>Quick sort</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Controls
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li class="ml-3 nav-item">
                                    <input onChange={this.changeArray} type="range" min="2" max={Math.floor(window.screen.width/50)} defaultValue={Math.floor((window.screen.width/50)/2)} id="changeSize" />
                                    <a class="nav-link">Increase Array Size</a>
                                </li>
                                <li class="ml-3 nav-item">
                                    <input onChange={this.changeSpeed} type="range" min="100" max={1000} defaultValue={500} id="changeSize"/>
                                    <a class="nav-link">Increase Speed</a>
                                </li>
                            </div>
                        </li>
                        <div id="error" class="alert alert-danger" style={{marginLeft:"10px",display:"none"}} role="alert">
                            Select an algorithm first!
                        </div>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.sortFunc}>Sort</button>
                        </form>
                    </div>
                    </nav>
              <div className="bars" id="bars" style={{margin:"20px"}}>
                    {
                    (this.state.arr.map((element,index) =>
                    <motion.div
                        key={element.id}
                        layout transition={springAnim}
                        className={`bar ${element.style}`}
                        id={element.id}
                        style={{height:element.value*3,order:index}}
                    >
                    
                    {element.value}
                    </motion.div>
                        
                    ))}
                </div>
            </div>
        )
    }
}
export default Sorting;