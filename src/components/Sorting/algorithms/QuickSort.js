const quickSort=(arr,length)=>{
    var result=[]
    sort(arr,0,length-1,result);
    arr.forEach(element => {
        element.style="bar-sorted";
    });
    result.push(JSON.parse(JSON.stringify(arr)));
    return result;
}
function sort(arr,l,h,result){
    if(l<h){
        var pi=partition(arr,l,h,result);
        sort(arr,l,pi-1,result);
        sort(arr,pi+1,h,result);
    }
}
function partition(arr,l,h,result){
    let pivot=arr[h];
    arr[h].style="bar-min";
    result.push(JSON.parse(JSON.stringify(arr)));
    var i=l-1;
    for(let j=l;j<h;j++){
        arr[j].style="bar-swap";
        result.push(JSON.parse(JSON.stringify(arr)));
        if(arr[j].value<pivot.value){
            i++;
            [arr[i],arr[j]]=[arr[j],arr[i]];
        }
        
    }
    arr[h].style=null;
    result.push(JSON.parse(JSON.stringify(arr)));
    [arr[i+1],arr[h]]=[arr[h],arr[i+1]];
    
    return i+1;
}
export default quickSort;
