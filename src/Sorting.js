import React, { Component } from "react";
import './styles/Sorting.css'
class Sorting extends Component{
    constructor(){
        super();
        this.state={
            arr:Array.from({length: Math.floor(window.screen.width/80)/2}, () => Math.floor(Math.random() * ((window.screen.height/4)-30+1))+30),
            method:"Algorithms",
            length:Math.floor(window.screen.width/80)/2,
            compare:{
                i:null,
                j:null
            },
            sorted:[]
        }
    }
    changeArray=(e)=>{
        this.setState({
            arr:Array.from({length: e.target.value}, () => Math.floor(Math.random() * ((window.screen.height/4)-30+1))+30),
            length:e.target.value,
            sorted:[],
            compare:{

            }
        })
    }
    componentDidMount(){
        
    }
    randomize=()=>{
        this.setState({
            arr:Array.from({length: this.state.length}, () => Math.floor(Math.random() * ((window.screen.height/4)-30+1))+30),
            sorted:[]
        })
    }
    sleep=(milliseconds)=> {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
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

    }
    selectionSort=()=>{
        let arr=this.state.arr;
        this.sorted=false;
        for(let i=0;i<arr.length;i++){
            let max=i;
            setTimeout(()=>{
                
                for(let j=i+1;j<=arr.length;j++){
                    this.setState({
                        compare:{
                            i:i,
                            j:max
                        }
                    })
                    console.log(this.state.compare)
                    if(arr[j]<arr[max]){
                        max=j;
                    }
                    this.setState({
                        arr:arr
                    })
                    
                    if(j==arr.length){
                        
                    }
                }
                
                [arr[i],arr[max]]=[arr[max],arr[i]];
                
                this.setState({
                    sorted:[...this.state.sorted,i]
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
              <div style={{margin:"20px"}}>
                    {
                    (this.state.arr.map((element,index) =>
                        index in this.state.sorted&&this.state.compare.i!=index&&this.state.compare.j!=index?
                        <div className="bar" style={{height:element*3,width:"66px",marginLeft:"6px",backgroundColor:"#b979ec"}}>{element}</div>:
                        this.state.compare.i==index||this.state.compare.j==index?
                        <div className="bar" style={{height:element*3,width:"66px",marginLeft:"6px",backgroundColor:"#57a846"}}>{element}</div>
                        :
                        <div className="bar" style={{height:element*3,width:"66px",marginLeft:"6px",backgroundColor:"#5bc9b1"}}>{element}</div>
                        
                    ))}
                </div>
            </div>
        )
    }
}
export default Sorting;