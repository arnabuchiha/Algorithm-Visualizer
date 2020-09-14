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
            sorted:false
        }
        this.sorted=false
    }
    changeArray=(e)=>{
        this.setState({
            arr:Array.from({length: e.target.value}, () => Math.floor(Math.random() * ((window.screen.height/4)-30+1))+30),
            length:e.target.value
        })
    }
    componentDidMount(){
        
    }
    randomize=()=>{
        this.setState({
            arr:Array.from({length: this.state.length}, () => Math.floor(Math.random() * ((window.screen.height/4)-30+1))+30),
            sorted:false
        })
    }
    selectionSort=(e)=>{
        e.preventDefault()
        let arr=this.state.arr;
        var sorted=false;
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
                    if(arr[j]<arr[max]){
                        max=j;
                    }
                    
                    this.setState({
                        arr:arr
                    })
                }
                [arr[i],arr[max]]=[arr[max],arr[i]]
                
            },200*i);
        };
        this.sorted=true;
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
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.selectionSort}>Sort</button>
                        </form>
                    </div>
                    </nav>
              <div style={{margin:"20px"}}>
                    {this.sorted?
                    (this.state.arr.map((element,index) =>
                        <div className="bar" style={{height:element*3,width:"66px",marginLeft:"6px",backgroundColor:"rgba(169, 92, 232, 0.8)"}}>{element}</div>
                        
                    )):
                    (this.state.arr.map((element,index) =>
                        this.state.compare.i===index||this.state.compare.j===index?
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