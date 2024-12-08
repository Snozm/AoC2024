import {input, mini} from './input.js'

let temp = input.split("\n")
let board = []
let total = 0
for(let i = 0; i < temp.length; i++){
    board.push(temp[i].split(""))
}
for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
        if(board[i][j] == "X"){
            total += findWord(board, [i, j], "XMAS")
        }
    }
}
console.log(total)

total = 0
for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
        if(board[i][j] == "A"){
            total += findX(board, [i, j])
        }
    }
}
console.log(total)

function findWord(board, startIndexes, word){
    let letters = word.split("")
    let totalWords = 0
    for(let i = 0; i < 8; i++){
        let xOffset = i < 4 ? Math.round(Math.cos(Math.PI * i/2)) : (i < 6 ? 1 : -1)
        let yOffset = i < 4 ? Math.round(Math.sin(Math.PI * i/2)) : (i % 2 == 0? 1 : -1)
        if(!isInBounds(board, startIndexes, [yOffset, xOffset], letters.length)){
            continue
        }
        let foundWord = true
        for(let j = 0; j < letters.length; j++){
            if(board[startIndexes[0] + j * yOffset][startIndexes[1] + j * xOffset] != letters[j]){
                foundWord = false
                break
            }
        }
        if(foundWord){
            totalWords++
        }
    }
    return totalWords
}

function findX(board, startIndexes){
    let i = startIndexes[0]
    let j = startIndexes[1]
    if(isInBounds(board, startIndexes, [-1, -1], 2) && board[i-1][j-1] == "M"){
        if(isInBounds(board, startIndexes, [1, 1], 2) && board[i-1][j+1] == "S"){
            return board[i+1][j-1] == "M" && board[i+1][j+1] == "S"
        }
        else if(isInBounds(board, startIndexes, [1, 1], 2) && board[i+1][j-1] == "S"){
            return board[i-1][j+1] == "M" && board[i+1][j+1] == "S"
        }
    }
    else if(isInBounds(board, startIndexes, [-1, -1], 2) && board[i-1][j-1] == "S"){
        if(isInBounds(board, startIndexes, [1, 1], 2) && board[i-1][j+1] == "M"){
            return board[i+1][j-1] == "S" && board[i+1][j+1] == "M"
        }
        else if(isInBounds(board, startIndexes, [1, 1], 2) && board[i+1][j-1] == "M"){
            return board[i-1][j+1] == "S" && board[i+1][j+1] == "M"
        }
    }
    return false
}

function isInBounds(arr, startIndexes, offsets, scale){
    let newX = startIndexes[1] + offsets[1] * (scale - 1)
    let newY = startIndexes[0] + offsets[0] * (scale - 1)
    return (newX >= 0) && (newX < arr[0].length) && (newY >= 0) && (newY < arr.length)
}