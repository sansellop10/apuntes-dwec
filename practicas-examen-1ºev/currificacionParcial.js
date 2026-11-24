// 1. Uso directo (dos argumentos a la vez)
console.log(applyDiscount(0.10, 50));   // 45
console.log(applyDiscount(0.25, 80));   // 60

// 2. Uso con closure / función parcial (un argumento cada vez)
const blackFriday = applyDiscount(0.50); // Crea una función con 50% guardado
const vipDiscount = applyDiscount(0.15); // Crea una función con 15% guardado

console.log(blackFriday(120)); // 60
console.log(blackFriday(49.99)); // 25
console.log(vipDiscount(200)); // 170

function applyDiscount(discountRate, price){
    const calculate = (finalPrice)=>{
        const result = finalPrice *(1-discountRate)
        return Math.round(result*100) /100  
    } 

    if(price !== undefined){
        return calculate(price)
    }

    return (nextPrice) => calculate(nextPrice)
}
