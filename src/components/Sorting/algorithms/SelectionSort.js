const selectionSort=(arr,length)=>{
        var results=[];
        for(let i=0;i<length;i++){
            let max=i;
            arr[i].style="bar-swap";
            for(let j=i+1;j<length;j++){
                
                if(arr[j].value<arr[max].value){
                    arr[max].style="bar";
                    max=j;
                }
                arr[j].style="bar-swap";
                arr[max].style="bar-min";
                results.push(JSON.parse(JSON.stringify(arr)));
                arr[j].style="bar";
                // arr[max].style="bar-min"
                if(j==arr.length){
                    
                }
            }
            arr[i].style="bar";        
            [arr[i],arr[max]]=[arr[max],arr[i]];
            arr[i].style="bar-sorted";
            results.push(JSON.parse(JSON.stringify(arr)));
            
        };
        results.push(JSON.parse(JSON.stringify(arr)));
        return results;
}
export default selectionSort;