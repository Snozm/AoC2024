import {input, mini} from './input.js'

let temp = input.split("\n\n")
let orderings = temp[0].split("\n")
let printers = temp[1].split("\n")
let pages = []

for(let i = 0; i < 100; i++){
    pages.push({previous: [], next: []})
}

for(let i = 0; i < orderings.length; i++){
    let numbers = orderings[i].split("|")
    let a = +numbers[0]
    let b = +numbers[1]
    pages[a].next.push(b)
    pages[b].previous.push(a)
}
let correctTotal = 0, wrongTotal = 0
for(let i = 0; i < printers.length; i++){
    let printing = printers[i].split(",")
    let printerPages = []
    let correct = true
    for(let j = 0; j < 100; j++){
        printerPages.push({previous: [], next: []})
    }
    for(let j = 0; j < printing.length; j++){
        for(let k = 0; k < printing.length; k++){
            if(pages[+printing[j]].previous.includes(+printing[k])){
                printerPages[+printing[j]].previous.push(+printing[k])
            }
            if(pages[+printing[j]].next.includes(+printing[k])){
                printerPages[+printing[j]].next.push(+printing[k])
            }
        }
        
        for(let k = j + 1; k < printing.length; k++){
            if(pages[+printing[k]].next.includes(+printing[j])){
                correct = false
            }
        }
    }
    if(correct){
        correctTotal += +printing[Math.floor(printing.length/2)]
    }
    else{
        let sorted = []
        for(let j = 0; j < printing.length; j++){
            for(let k = 0; k < printing.length; k++){
                if(printerPages[+printing[k]].previous.length == 0){
                    sorted.push(+printing[k])
                    printerPages[+printing[k]].previous.push("done")
                    for(let l = 0; l < printing.length; l++){
                        if(printerPages[+printing[l]].previous.includes(+printing[k])){
                            printerPages[+printing[l]].previous.splice(printerPages[+printing[l]].previous.indexOf(+printing[k]), 1)
                        }
                    }
                    break
                }
            }
        }
        wrongTotal += +sorted[Math.floor(sorted.length/2)]
    }
}
console.log(correctTotal)
console.log(wrongTotal)
