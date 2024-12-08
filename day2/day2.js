import {input, mini} from './input.js'

let a = input.split("\n")
let total = 0

for(let i = 0; i < a.length; i++){
    total += safe(a[i].split(" ")) ? 1 : 0
}

console.log(total)

total = 0

for(let i = 0; i < a.length; i++){
    let b = problemDampener(a[i].split(" "))

    if(b == false){
        continue
    }

    total += safe(b) ? 1 : 0
}

console.log(total)

function safe(arr){
    let prev = +arr[0], inc = true, dec = true
    for(let j = 1; j < arr.length; j++){
        if(Math.abs(+arr[j] - prev) <= 3 && Math.abs(+arr[j] - prev) >= 1){
            if(+arr[j] < prev){
                inc = false
            }
            else{
                dec = false
            }
        }
        else{
            inc = false
            dec = false
            break
        }
        prev = +arr[j]
    }
    return inc || dec
}

function problemDampener(arr){
    if(safe(arr)){
        return arr
    }

    for(let i = 0; i < arr.length; i++){
        let arr2 = []

        for(let j = 0; j < arr.length; j++){
            if(j != i){
                arr2.push(arr[j])
            }
        }

        if(safe(arr2)){
            return arr2
        }
    }

    return false
}