import PriorityQueue from "js-priority-queue";
function isInsideGrid(i,j,grid)
    { 
        return (i >= 0 && i < grid.length && j >= 0 && j < grid[0].length); 
    } 
const dijkstra = (grid, startNode, endNode) => {
    
        let arr=grid;
        let visited_nodes=[];
        let shortestPath=[];
        let start_node=startNode;
        let end_node=endNode;
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
                if(!isInsideGrid(x,y,arr))continue;
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
        return {visited_nodes,shortestPath};
}
export default dijkstra;