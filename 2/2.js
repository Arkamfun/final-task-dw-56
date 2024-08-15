function bubbleSort(arr) {

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            // pengoperasian logic
            if(arr[j] > arr[j+1]) {
                // swap
                let temp = arr[j]
                arr[j] = arr[j+1]
                // nilai arr[j+1] disimpan di temp
                arr[j+1] = temp
                
            }
        }
    }
    return console.log(arr);
}















// uji coba logic
// const arry = [4,3,6,5,5]
// console.log(arry.length);
// console.log(arry.length-1);
// if(arry[0] > arry[1]){
//     let temp = arry[0];
//     arry[0] = arry[1];
//     arry[1] = temp;
//     console.log(arry);
// }

// if(arry[1] > arry[2]){
//     let temp = arry[1];
//     arry[1] = arry[2];
//     arry[2] = temp;
//     console.log(arry);
// }
// if(arry[2] > arry[3]){
//     let temp = arry[2];
//     arry[2] = arry[3];
//     arry[3] = temp;
//     console.log(arry);
// }
// if(arry[3] > arry[4]){
//     let temp = arry[3];
//     arry[3] = arry[4];
//     arry[4] = temp;
//     console.log(arry);
//     console.log(temp);
    
// }

bubbleSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92])