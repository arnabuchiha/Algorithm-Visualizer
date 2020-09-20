import React, { Component } from "react";
import '../styles/Sorting.css';
import { motion } from "framer-motion";
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
            sorted:[]
        }

    }
    createArray=(e=Math.floor(window.innerWidth/80)/2)=>{
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
        this.createArray()
    }
    sortFunc=(e)=>{
        e.preventDefault();
        document.getElementById('error').style="display:none";
        if(this.state.method=="Algorithms"){
            document.getElementById('error').style="display:block";
        }
        else{
            if(this.state.method=="Selection Sort")
                this.selectionSort();
            else if(this.state.method=="Insertion Sort")
                this.insertionSort();
        }
    }
    insertionSort=()=>{
        // document.getElementById("bars").
        let elementI=document.getElementById('id-2');
        let elementJ=document.getElementById('id-4');
        document.getElementById("bars").insertBefore(elementI,elementJ)
        document.getElementById("bars").insertBefore(elementJ,elementI)
        [elementI.style.left, elementJ.style.left] = [elementJ.style.left, elementI.style.left];
    }
    selectionSort=()=>{
        
        let arr=this.state.arr;
        console.log(this.state.arr);
        this.sorted=false;
        let length=this.state.length;
        let sorts=[];
        for(let i=0;i<length;i++){
            let max=i;
            setTimeout(()=>{
                arr[i].style="bar-swap";
                this.setState({
                    arr:arr
                })
                for(let j=i+1;j<length;j++){
                    // this.setState({
                    //     compare:{
                    //         i:i,
                    //         j:max
                    //     }
                    // })
                    console.log(this.state.compare)
                    // try{
                    
                    if(arr[j].value<arr[max].value){
                        max=j;
                    }
                // }catch{}
                    // this.setState({
                    //     arr:arr
                    // })
                    arr[j].style="bar-swap";
                    // arr[max].style="bar-swap";
                    if(j==arr.length){
                        
                    }
                }
                
                [arr[i],arr[max]]=[arr[max],arr[i]];
                arr[i].style="bar-sorted";

                this.setState({
                    sorted:[...this.state.sorted,i],
                    arr:arr
                })
                
                
            },1000*i);
            
        };
        
        
        
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
                        <li class="nav-item active">
                            <a class="nav-link" href="#" onClick={this.randomize}>Randomize <span class="sr-only">(current)</span></a>
                        </li>
                        
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.method}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#" onClick={()=>this.setState({method:"Selection Sort"})}>Selection Sort</a>
                                <a class="dropdown-item" href="#" onClick={()=>this.setState({method:"Insertion Sort"})}>Insertion sort</a>
                                <a class="dropdown-item" href="#" onClick={()=>this.setState({method:"Quick Sort"})}>Quick sort</a>
                            </div>
                        </li>
                        <li class="nav-item">
                        <input onChange={this.changeArray} type="range" min="2" max={Math.floor(window.screen.width/80)} defaultValue={Math.floor(window.screen.width/80)/2} id="changeSize" style={{background: "white",cursor: "pointer"}}/>
                        <a class="nav-link">Increase Array Size</a>
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
                        style={{height:element.value*3}}
                    >
                    {element.value}
                    </motion.div>
                        // index in this.state.sorted&&this.state.compare.i!=index&&this.state.compare.j!=index?
                        // <div id={element.id} className="bar" style={{height:element.value*3,width:"66px",marginLeft:"6px",backgroundColor:"#b979ec",order:index}}>{element.value}</div>:
                        // this.state.compare.i==index||this.state.compare.j==index?
                        // <div id={element.id} className="bar" style={{height:element.value*3,width:"66px",marginLeft:"6px",backgroundColor:"#57a846",order:index}}>{element.value}</div>
                        // :
                        // <div id={element.id} className="bar" style={{height:element.value*3,width:"66px",marginLeft:"6px",backgroundColor:"#5bc9b1",order:index}}>{element.value}</div>
                        
                    ))}
                </div>
            </div>
        )
    }
}
export default Sorting;