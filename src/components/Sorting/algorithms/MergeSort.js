const mergeSort=(arr,length)=>{
    // console.log(arr);
    var result=[]
    sort(arr,0,length-1,result);
    arr.forEach(element => {
        element.style="bar-sorted";
    });
    result.push(JSON.parse(JSON.stringify(arr)));
    return result;
    // console.log(result);
}
function sort(arr,l,r,result){
    if(l<r){
    let m=Math.floor( l+(r-l)/2);
    sort(arr,l,m,result);
    sort(arr,m+1,r,result);
    merge(arr,l,m,r,result);
    result.push(JSON.parse(JSON.stringify(arr)));
    }
}
function merge(arr,l,m,r,result){
    let temp_left=[];
    let temp_right=[];
    
    for(let i=l;i<=m;i++){
        // console.log(JSON.parse(JSON.stringify(arr[i])));
        temp_left.push(JSON.parse(JSON.stringify(arr[i])));
    }
    for(let i=m+1;i<=r;i++){
        temp_right.push(JSON.parse(JSON.stringify(arr[i])));
    }
    
    var i=0,j=0,k=l;
    var n1=m-l+1;
    var n2=r-m;
    while(i<n1&&j<n2){
        if(temp_left[i].value<=temp_right[j].value){
            arr[k]=temp_left[i];
            arr[k].style="bar-swap";
            // result.push(JSON.parse(JSON.stringify(arr)));
            i++;
            k++;
        }
        else{
            arr[k]=temp_right[j];
            arr[k].style="bar-swap";
            // result.push(JSON.parse(JSON.stringify(arr)));
            j++;
            k++;
        }
    }
    while(i<n1){
        arr[k]=temp_left[i];
        arr[k].style="bar-swap";
        // result.push(JSON.parse(JSON.stringify(arr)));
        k++;
        i++;
    }
    while(j<n2){
        arr[k]=temp_right[j];
        arr[k].style="bar-swap";
        // result.push(JSON.parse(JSON.stringify(arr)));
        k++;
        j++;
    }
    
}
export default mergeSort;