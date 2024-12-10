import {input,mini} from './input.js'

let board = input.split("\n").map(row => row.split("").map(cell => +cell))
let total = 0

for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[0].length; j++){
        if(board[i][j] == 0){
            total += dfs(board, {x: j, y: i}, new Set())
        }
    }
}

console.log(total)
total = 0

for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[0].length; j++){
        if(board[i][j] == 0){
            total += dfsRating(board, {x: j, y: i})
        }
    }
}

console.log(total)

function dfs(board, start, checked){
    checked.add(`${start.x},${start.y}`)
    let next = board[start.y][start.x] + 1

    if(next == 10){
        return 1
    }

    let total = 0

    for(let i = 0 ; i < 4; i++){
        let newX = start.x + Math.round(Math.cos(Math.PI/2 * i))
        let newY = start.y + Math.round(Math.sin(Math.PI/2 * i))

        if(isInBounds(board, newX, newY) && !checked.has(`${newX},${newY}`) && board[newY][newX] == next){
            total += dfs(board, {x: newX, y: newY}, checked)
        }
    }
    return total
}

function dfsRating(board, start){
    let next = board[start.y][start.x] + 1

    if(next == 10){
        return 1
    }

    let total = 0

    for(let i = 0 ; i < 4; i++){
        let newX = start.x + Math.round(Math.cos(Math.PI/2 * i))
        let newY = start.y + Math.round(Math.sin(Math.PI/2 * i))

        if(isInBounds(board, newX, newY) && board[newY][newX] == next){
            total += dfsRating(board, {x: newX, y: newY})
        }
    }
    return total
}

function isInBounds(board, x, y) {
    return x >= 0 && y >= 0 && x < board[0].length && y < board.length;
}