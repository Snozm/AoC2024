import {input,mini} from './input.js'

const disk = input.split("")
let memory1 = []
let memory2 = []

for(let i = 0; i < disk.length; i++) {
    i % 2 == 0 ? memory1.push({index: i/2, length: +disk[i]}) : memory1.push({index: "space", length: +disk[i]})
    i % 2 == 0 ? memory2.push({index: i/2, length: +disk[i], done: false}) : memory2.push({index: "space", length: +disk[i], done: false})
}

let leftIndex = 1
let rightIndex = memory1.length % 2 != 0 ? memory1.length - 1 : memory1.length - 2

while(leftIndex < rightIndex){
    while(memory1[leftIndex].length != 0){
        if(memory1[leftIndex].length - memory1[rightIndex].length >= 0){
            memory1[leftIndex].length -= memory1[rightIndex].length
            memory1.splice(leftIndex, 0, memory1[rightIndex])
            leftIndex++
            memory1.splice(rightIndex + 1, 1)
            rightIndex--
        }
        else{
            memory1[rightIndex].length -= memory1[leftIndex].length
            memory1.splice(leftIndex, 0, {index : memory1[rightIndex].index, length: memory1[leftIndex].length})
            leftIndex++
            memory1[leftIndex].length = 0
            rightIndex++
        }
    }

    memory1.splice(leftIndex, 1)
    leftIndex++
    rightIndex--
}

console.log(checkSum(memory1))

let trueLeftIndex = 1
rightIndex = memory2.length % 2 != 0 ? memory2.length - 1 : memory2.length - 2

while(trueLeftIndex < rightIndex){
    leftIndex = trueLeftIndex
    while(leftIndex < rightIndex && leftIndex < memory2.length){
        if(memory2[leftIndex].index != "space"){
            leftIndex++ 
            continue
        }
        if(memory2[leftIndex].length - memory2[rightIndex].length == 0){
            memory2[leftIndex] = {index: memory2[rightIndex].index, length: memory2[rightIndex].length, done: true}
            memory2[rightIndex].index = "space"
            break
        }
        else if(memory2[leftIndex].length - memory2[rightIndex].length > 0){
            memory2[leftIndex].length -= memory2[rightIndex].length
            memory2.splice(leftIndex, 0, {index: memory2[rightIndex].index, length: memory2[rightIndex].length, done: true})
            memory2[rightIndex + 1].index = "space"
            rightIndex++
            break
        }
        else{
            leftIndex ++
        }
    }

    for(let i = rightIndex - 1; i > 0; i--){
        if(memory2[i].index != "space" && !memory2[i].done){
            rightIndex = i
            break
        }
    }
    
    for(let i = 1; i < memory2.length; i++){
        if(memory2[i].index == "space"){
            trueLeftIndex = i;
            break
        }
    }
}

console.log(checkSum(memory2))

function checkSum(arr){
    let total = 0
    let placement = 0
    for(let i = 0; i < arr.length; i++){
        if(arr[i].index != "space"){
            for(let j = 0; j < arr[i].length; j++){
                total += arr[i].index * placement
                placement++
            }
        }
        else{
            placement += arr[i].length
        }
    }
    return total
}