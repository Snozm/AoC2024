import {input,mini} from './input.js'

let stones = input.split(" ")
var lookup = new Map()
lookup.set("0", "1")
let stoneMap = new Map()

for(let i = 0; i < stones.length; i++){
    let result = stoneMap.get(stones[i])
    
    if(result){
        stoneMap.set(stones[i], result + 1)
        continue
    }

    stoneMap.set(stones[i], 1)
}

for(let i = 0; i < 25; i++){
    stoneMap = blink(stoneMap)
}

console.log(tally(stoneMap))

for(let i = 0; i < 50; i++){
    stoneMap = blink(stoneMap)
}

console.log(tally(stoneMap))

function blink(map){
    let keys = map.keys()
    let keys2 = map.keys()
    let newMap = new Map()
    while(keys.next().value){
        let key = keys2.next().value
        let value = map.get(key) + ""
        let result = lookup.get(key)

        if(result){
            for(let element of result){
                newMap.set(element, newMap.get(element) ? +newMap.get(element) + +value : +value)
            }
            continue
        }

        let str

        if(key.length % 2 == 0){
            str = [key.substring(0, key.length / 2), +key.substring(key.length / 2) + ""]
        }
        else{
            str = [(+key * 2024) + ""]
        }

        for(let element of str){
            newMap.set(element, newMap.get(element) ? +newMap.get(element) + +value : +value)
        }


        lookup.set(key, str)
    }
    return newMap
}

function tally(map){
    let total = 0
    let keys = map.keys()
    let keys2 = map.keys()

    while(keys.next().value){
        total += +map.get(keys2.next().value)
    }

    return total
}