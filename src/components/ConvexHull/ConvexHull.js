import React, { Component } from "react";
import "../../styles/ConvexHull.css";
import Instruct from "../Instructions/Instruct";
import instruct_gif from "../../assets/convex_instruct.gif";
import { NavLink } from "react-router-dom";
class ConvexHull extends Component{
    constructor(){
        super()
        this.state={
            points:[],
            showModal:true
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
    componentDidMount(){
        window.addEventListener("resize",(e)=>{
            // var canvas = document.getElementById("myCanvas");
            this.canvas.setAttribute("width",0.7*window.innerWidth);
            this.canvas.setAttribute("height",0.7*window.innerHeight);
            this.setState({
                points:[]
            })

        
        })
        this.canvas = document.getElementById("myCanvas");
        this.canvas.addEventListener("mousedown",(e)=>this.makePoint(e));
    }
    makePoint=(event)=>{
        let rect = this.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left; 
        let y = event.clientY - rect.top; 
        var ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.stroke();
        this.setState({
            points:[...this.state.points,{x,y}]
        })
    }
    drawAllNodes=()=>{
        var points=this.state.points;
        points.forEach(e=>{
            var ctx = this.canvas.getContext("2d");
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.strokeStyle="black";
            ctx.arc(e.x, e.y, 10, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
        })
    }
    drawDottedLine=(x1=this.state.points[0].x,y1=this.state.points[0].y,x2=this.state.points[1].x,y2=this.state.points[1].y)=>{
        var ctx = this.canvas.getContext("2d");
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    clearBoard=()=>{
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.setState({
            points:[]
        })
    }
    drawLine=(x1=this.state.points[0].x,y1=this.state.points[0].y,x2=this.state.points[1].x,y2=this.state.points[1].y)=>{
        var ctx = this.canvas.getContext("2d");
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(x1,y1);

        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath();
    }
    makeCircle=(x,y)=>{
        var ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
        ctx.closePath()
    }

    createRandomNodes=() =>{
        var context = this.canvas.getContext("2d");
        var num=10
        var max_width=this.canvas.width-20;
        var max_height=this.canvas.height-20;
        this.clearBoard();
        var points=[]
        for (var i = 0; i <=num; i++) {
            var x = Math.floor(Math.random() * (max_width-50)+50);
            var y = Math.floor(Math.random() * (max_height-50)+50);
            points.push({x,y})
            
        }
        this.setState({
            points:points
        },this.drawAllNodes)
        
    }
    compare=(a,b)=>{
        if(a.x<b.x) return -1;
        if(a.x==b.x&&a.y<b.y) return -1;
        return 1;
    }
    orientation=(a,b,c)=>{
        var alpha=(b.y-a.y)/(b.x-a.x);
        var beta=(c.y-b.y)/(c.x-b.x)
        if(alpha>beta)return 1;
        else if(beta>alpha)return -1;
        return 0;
    }
    convexHull=(e)=>{
        e.preventDefault()
        var points=this.state.points;
        if(points.length<=2){
            var error=document.getElementById("error");
            error.innerHTML="The available points is less than three!!";
            error.style.display="block";
            return;
        }
        document.getElementById("error").style.display="none";
        points.sort(this.compare);
        var n=points.length;
        var p1=points[0],p2=points[n-1];
        var up=[],lo=[];
        lo.push(p1);
        up.push(p1);
        const context = this.canvas.getContext('2d');

        // context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var animate=[]
        for(let i=1;i<n;i++){
            if(i==n-1||this.orientation(p1,points[i],p2)!=-1){
                animate.push(JSON.parse(JSON.stringify(up)));
                while(up.length>=2&&this.orientation(up[up.length-2],up[up.length-1],points[i])==-1){
                    up.pop();
                    animate.push(JSON.parse(JSON.stringify(up)));
                }
                up.push(points[i]);
                
            }
            if(i==n-1||this.orientation(p1,points[i],p2)!=1){
                animate.push(JSON.parse(JSON.stringify(lo)));
                while(lo.length>=2&&this.orientation(lo[lo.length-2],lo[lo.length-1],points[i])==1){
                    lo.pop();
                    animate.push(JSON.parse(JSON.stringify(lo)));
                }
                lo.push(points[i])
            }
        }
        animate.push(JSON.parse(JSON.stringify(up)));
        animate.push(JSON.parse(JSON.stringify(lo)));
        console.log(animate)
        var flag;
        for(let i=0;i<animate.length;i++){
            // context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            setTimeout(()=>{
                // context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.drawAllNodes();
                var temp=animate[i]
                for(let j=0;j<temp.length-1;j++){
                        this.drawDottedLine(temp[j].x,temp[j].y,temp[j+1].x,temp[j+1].y);
                    
                }
            },500*(i))
            flag=i;
        }
        var result=[];
        for(let i=0;i<up.length-1;i++){
            result.push(up[i]);
        }
        for(let i=lo.length-1;i>=0;i--){
            result.push(lo[i]);
        }
        setTimeout(()=>{
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawAllNodes();
            this.makeCircle(p1.x,p1.y);
            this.makeCircle(p2.x,p2.y);
            for(let i=0;i<result.length-1;i++){
                this.drawLine(result[i].x,result[i].y,result[i+1].x,result[i+1].y);
            }
        },500*flag);
        
    }

    render(){
        return(
            <div style={{height:"100vh",alignItems:"center"}}>
                <Instruct show={this.state.showModal}>
                    <h3>How to use?</h3>
                <img className="card-img-top img-thumbnail" style={{marginBottom:"5px"}} src={instruct_gif} alt="Card image cap"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.hideModal}>Close</button>
                </Instruct>
                <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{color:"white"}}>
                    <a className="navbar-brand" href="#">ConvexHull Visualizer</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                        <NavLink exact to="/" className="nav-link">Home</NavLink>
                        </li>
                        
                        <li className="nav-item">
                        <a className="nav-link" href="#" onClick={()=>this.createRandomNodes()}>Random Points <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#" onClick={this.showModal}>Instructions <span className="sr-only" >(current)</span></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#" onClick={()=>this.clearBoard()}>Clear <span className="sr-only">(current)</span></a>
                        </li>
                        <div id="error" className="alert alert-danger" style={{margin:"auto",marginBottom:"5px",display:"none",width:"50vw"}} role="alert">
                        </div>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e)=>this.convexHull(e)}>Run</button>
                        </form>
                    </div>
                    </nav>
                <canvas id="myCanvas" className="canvas" width={0.7*window.innerWidth} height={0.7*window.innerHeight} ></canvas> 
                
            </div>
        )
    }
}
export default ConvexHull;