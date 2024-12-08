// Today me and my friend Chris are solving the problem using the other person's idea. This is my idea
import {input, mini} from './input.js'
let start = Date.now()
let board = input.split("\n").map(row => row.split(""))
let total = 0
let antennae = {}
let antinodes = new Set()

for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
        if(board[i][j] != ".") {
            let key = board[i][j]
    
            if(!antennae[key]) {
                antennae[key] = []
            }

            antennae[key].push({y: i, x: j})
        }
    }
}

for(let key in antennae) {
    let arr = antennae[key]
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            let xDiff = arr[i].x - arr[j].x
            let yDiff = arr[i].y - arr[j].y
            if(isInBounds(board, arr[i].x + xDiff, arr[i].y + yDiff)){
                if(!antinodes.has(`${arr[i].x + xDiff},${arr[i].y + yDiff}`)){
                    total++
                    antinodes.add(`${arr[i].x + xDiff},${arr[i].y + yDiff}`)
                }
            }
            if(isInBounds(board, arr[j].x - xDiff, arr[j].y - yDiff)){
                if(!antinodes.has(`${arr[j].x - xDiff},${arr[j].y - yDiff}`)){
                    total++
                    antinodes.add(`${arr[j].x - xDiff},${arr[j].y - yDiff}`)
                }
            }
        }
    }
}

console.log(total)
total = 0
antinodes = new Set()

for(let key in antennae) {
    let arr = antennae[key]
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            let range = findRange(board, arr[i], arr[j])
            let xDiff = arr[i].x - arr[j].x
            let yDiff = arr[i].y - arr[j].y

            for(let k = range[0]; k <= range[1]; k++){
                if(k <= 0){
                    if(!antinodes.has(`${arr[i].x - xDiff * k},${arr[i].y - yDiff * k}`)){
                        total++
                        antinodes.add(`${arr[i].x - xDiff * k},${arr[i].y - yDiff * k}`)
                    }
                }

                if(k >= 0){
                    if(!antinodes.has(`${arr[j].x - xDiff * k},${arr[j].y - yDiff * k}`)){
                        total++
                        antinodes.add(`${arr[j].x - xDiff * k},${arr[j].y - yDiff * k}`)
                    }
                }
            }
        }
    }
}

console.log(total)
console.log(Date.now() - start)

function findRange(board, antenna1, antenna2){
    let xDiff = antenna1.x - antenna2.x
    let yDiff = antenna1.y - antenna2.y
    let minScale = 0

    while(isInBounds(board, antenna1.x - xDiff * minScale, antenna1.y - yDiff * minScale)){
        minScale--
    }

    let maxScale = 0

    while(isInBounds(board, antenna2.x - xDiff * maxScale, antenna2.y - yDiff * maxScale)){
        maxScale++
    }

    return [minScale + 1, maxScale - 1]
}

function isInBounds(board, x, y) {
    return x >= 0 && y >= 0 && x < board[0].length && y < board.length;
}