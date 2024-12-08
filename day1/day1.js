import {input, mini} from './input.js'

let a = input.split("\n")
let b = [], c = []

for(let i = 0; i < a.length; i++){
    b.push(a[i].split("   ")[0])
    c.push(a[i].split("   ")[1])
}

b = mergeSort(b)
c = mergeSort(c)

let total = 0;

for(let i = 0; i < b.length; i++){
    total += Math.abs(c[i] - b[i])
}

console.log(total)

let bIndex = 0, cIndex = 0
total = 0

for(let i = 0; i < b.length; i++){
    for(let j = 0; j < c.length; j++){
        if(b[i] < c[j]){
            break
        }
        if(b[i] == c[j]){
            total += +b[i]
        }
    }

}
console.log(total)

function mergeSort(arr){
    if(arr.length == 1){
        return arr
    }
    let n = Math.ceil(arr.length/2)
    let arr2 = arr.slice(0, n), arr3 = arr.slice(n), arr4 = []
    arr2 = mergeSort(arr2)
    arr3 = mergeSort(arr3)
    while(arr2.length != 0 && arr3.length != 0){
        if(arr2[0] > arr3[0]){
            arr4.push(arr3.splice(0, 1)[0])
            continue
        }
        arr4.push(arr2.splice(0, 1)[0])
    }
    if(arr2.length == 0){
        arr4 = arr4.concat(arr3)
    }
    if(arr3.length == 0){
        arr4 = arr4.concat(arr2)
    }
    return arr4
}