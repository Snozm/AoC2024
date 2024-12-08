// Today me and my friend Chris are solving the problem using the other person's idea. This is his idea.
import {input, mini} from './input.js';

let board = input.split("\n").map(row => row.split(""));
let antennae = new Map();

for(let i = 0; i < board.length; i++) {
  for(let j = 0; j < board[i].length; j++) {
    if(board[i][j] !== ".") {
        let key = board[i][j];

        if(!antennae.has(key)) {
            antennae.set(key, []);
        }
        antennae.get(key).push([i, j]);
    }
  }
}

let antinodes = [];
let keys = antennae.keys();

for(let i = 0; i < antennae.size; i++) {
    noCollissionConcat(antinodes, getAntinodes(antennae.get(keys.next().value)));
}

console.log(antinodes.length);

antinodes = [];
keys = antennae.keys();

for(let i = 0; i < antennae.size; i++) {
    noCollissionConcat(antinodes, getAntinodesResonant(antennae.get(keys.next().value)));
}

console.log(antinodes.length);

function getAntinodes(arr){
    let antinodes = [];
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            let xDiff = arr[i][1] - arr[j][1];
            let yDiff = arr[i][0] - arr[j][0];
            if(isInBounds(board, [arr[i][0] + yDiff, arr[i][1] + xDiff])) {
                antinodes.push([arr[i][0] + yDiff, arr[i][1] + xDiff]);
            }
            if(isInBounds(board, [arr[j][0] - yDiff, arr[j][1] - xDiff])) {
                antinodes.push([arr[j][0] - yDiff, arr[j][1] - xDiff]);
            }
        }
    }
    return antinodes;
}

function getAntinodesResonant(arr){
    let antinodes = [];
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            let xDiff = arr[i][1] - arr[j][1];
            let yDiff = arr[i][0] - arr[j][0];
            let scale = 0;
            while(isInBounds(board, [arr[i][0] - yDiff * scale, arr[i][1] - xDiff * scale])) {
                antinodes.push([arr[i][0] - yDiff * scale, arr[i][1] - xDiff * scale]);
                scale--;
            }
            scale = 0;
            while(isInBounds(board, [arr[j][0] - yDiff * scale, arr[j][1] - xDiff * scale])) {
                antinodes.push([arr[j][0] - yDiff * scale, arr[j][1] - xDiff * scale]);
                scale++;
            }
        }
    }
    return antinodes;
}

function isInBounds(board, coords) {
    return coords[1] >= 0 && coords[0] >= 0 && coords[1] < board[0].length && coords[0] < board.length;
}

function noCollissionConcat(arr1, arr2) {
    for(let i = 0; i < arr2.length; i++) {
        let contained = false;
        for(let j = 0; j < arr1.length; j++) {
            if(arr1[j][0] === arr2[i][0] && arr1[j][1] === arr2[i][1]) {
                contained = true;
                break;
            }
        }
        if(!contained) {
            arr1.push(arr2[i]);
        }
    }
}