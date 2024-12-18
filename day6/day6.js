import {input, mini} from './input.js'

let board = input
board = board.split("\n").map(row => row.split(""))
let start = {x: 0, y: 0}
let checked = 0

for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[0].length; j++) {
        if(board[i][j] == "^") {
            start.x = j
            start.y = i
            board[i][j] = "."
            break
        }
    }

    if(start.x != 0 && start.y != 0) {
        break
    }
}

let guard = {x: start.x, y: start.y, xOffset: 0, yOffset: -1, cycle: 0}

while(isInBounds(board, guard.x, guard.y)) {
    if(board[guard.y][guard.x] == ".") {
        checked++
        board[guard.y][guard.x] = "X"
    }

    if(isInBounds(board, guard.x + guard.xOffset, guard.y + guard.yOffset)){
        if(board[guard.y + guard.yOffset][guard.x + guard.xOffset] == "#") {
            guard.cycle = (guard.cycle + 1) % 4
            guard.xOffset = Math.round(Math.cos((guard.cycle - 1) * Math.PI / 2))
            guard.yOffset = Math.round(Math.sin((guard.cycle - 1) * Math.PI / 2))
        }
    }

    guard.x += guard.xOffset
    guard.y += guard.yOffset
}

console.log(checked)

clearBoard(board)

checked = 0

for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[0].length; j++) {
        if(board[i][j] == "#" || (i == start.y && j == start.x)){
            continue
        }

        let visited = []
        let guard = {x: start.x, y: start.y, xOffset: 0, yOffset: -1, cycle: 0}
        board[i][j] = "#"

        while(isInBounds(board, guard.x, guard.y)) {
            if(board[guard.y][guard.x] == ".") {
                board[guard.y][guard.x] = "X"
            }
            else{
                if(visited.includes(guard.x + ',' + guard.y + ',' + guard.cycle)){
                    checked++
                    break
                }
                visited.push(guard.x + ',' + guard.y + ',' + guard.cycle)
            }
            
            if(isInBounds(board, guard.x + guard.xOffset, guard.y + guard.yOffset)){
                while(board[guard.y + guard.yOffset][guard.x + guard.xOffset] == "#") {
                    guard.cycle = (guard.cycle + 1) % 4
                    guard.xOffset = Math.round(Math.cos((guard.cycle - 1) * Math.PI / 2))
                    guard.yOffset = Math.round(Math.sin((guard.cycle - 1) * Math.PI / 2))
                }
            }
            
            guard.x += guard.xOffset
            guard.y += guard.yOffset
        }

        board[i][j] = "."
        clearBoard(board)
    }
}
console.log(checked)

function isInBounds(board, x, y) {
    return x >= 0 && y >= 0 && x < board[0].length && y < board.length
}

function clearBoard(board) {
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[0].length; j++) {
            if(board[i][j] == "X") {
                board[i][j] = "."
            }
        }
    }
}