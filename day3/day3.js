import {input, mini} from './input.js'

let a = input.split("mul(")
let total = 0, enabled = true

for(let i = 0; i < a.length; i++){
    let b = a[i].split(""), stage = "start1", numberTotal1 = 0, numberTotal2 = 0

    for(let j = 0; j < b.length; j++){
        if(b[j] >= '0' && b[j] <= '9'){
            if(stage == "start1" || stage == "num1"){
                numberTotal1 *= 10
                numberTotal1 += +b[j]
                stage = "num1"
            }

            if(stage == "start2" || stage == "num2"){
                numberTotal2 *= 10
                numberTotal2 += +b[j]
                stage = "num2"
            }
        }
        else if(b[j] == ',' && stage == "num1"){
            stage = "start2"
        }
        else if(b[j] == ')'){
            if(stage == "num2")
                total += numberTotal1 * numberTotal2
            stage = "done"
        }
        else{
            stage = "done"
        }
    }
}

console.log(total)
total = 0

for(let i = 0; i < a.length; i++){
    let b = a[i].split(""), stage = "start1", numberTotal1 = 0, numberTotal2 = 0

    for(let j = 0; j < b.length; j++){
        if(b[j] >= '0' && b[j] <= '9'){
            if(stage == "start1" || stage == "num1"){
                numberTotal1 *= 10
                numberTotal1 += +b[j]
                stage = "num1"
            }

            if(stage == "start2" || stage == "num2"){
                numberTotal2 *= 10
                numberTotal2 += +b[j]
                stage = "num2"
            }
        }
        else if(b[j] == ',' && stage == "num1"){
            stage = "start2"
        }
        else if(b[j] == ')'){
            if(stage == "num2" && enabled)
                total += numberTotal1 * numberTotal2
            stage = "done"
        }
        else if(b[j] == 'd'){
            stage = "done"

            if(b.length - j < 4){
                break
            }
            if(equals(b.slice(j, j + 4), "do()".split(""))){
                enabled = true
                j += 3
                continue
            }
            if(b.length - j < 7){
                break
            }
            if(equals(b.slice(j, j + 7), "don't()".split(""))){
                enabled = false
                j += 6
                continue
            }
        }
        else{
            stage = "done"
        }
    }
}

console.log(total)

function equals(arr1, arr2){
    if(arr1.length != arr2.length){
        return false
    }
    for(let i = 0; i < arr1.length; i++){
        if(arr1[i] != arr2[i]){
           return false
        }
    }
    return true
}