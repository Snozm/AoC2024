import {input, mini} from './input.js'

let temp = input
temp = temp.split('\n').map(row => row.split(": "))
let values = []
let total = 0

for(let i = 0; i < temp.length; i++){
    values.push([temp[i][0]])
    values[i] = values[i].concat(temp[i][1].split(" "))
}

for(let i = 0; i < values.length; i++){
    for(let j = 0; j < Math.pow(2, values[i].length - 2); j++){
        let subtotal = +values[i][1]
        for(let k = 1; k < values[i].length - 1; k++){
            subtotal = operation2(subtotal, values[i][k + 1], findStage(j, k, 2))
        }
        if(subtotal == values[i][0]){
            total += subtotal
            break
        }
    }
}

console.log(total)

total = 0

for(let i = 0; i < values.length; i++){
    for(let j = 0; j < Math.pow(3, values[i].length - 2); j++){
        let subtotal = +values[i][1]
        for(let k = 1; k < values[i].length - 1; k++){
            subtotal = operation3(subtotal, values[i][k + 1], findStage(j, k, 3))
        }
        if(subtotal == values[i][0]){
            total += subtotal
            break
        }
    }
}

console.log(total)

function operation2(a, b, stage){
    return stage == 0 ? a + +b : a * +b
}

function operation3(a, b, stage){
    return stage == 0 ? a + +b : (stage == 1 ? a * +b : +(a + b))
}

function findStage(j, k, power){
    let num = j % Math.pow(power, k)
    return Math.floor(num / Math.pow(power, (k - 1)))
}