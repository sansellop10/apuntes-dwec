// 1. Llamada directa (baseCost y weightKg a la vez)
console.log(calculateShipping(5, 3));  // 11
console.log(calculateShipping(10, 2)); // 14

// 2. Llamada parcial (primero baseCost, luego weightKg)
const envioStandard = calculateShipping(5);
const envioUrgente = calculateShipping(12);

console.log(envioStandard(3)); // 11
console.log(envioStandard(0)); // 5
console.log(envioUrgente(2));  // 16


function calculateShipping(baseCost, weightKg){
    if(weightKg !== undefined){
        return baseCost + weightKg * 2
    }

    return (newWeigth)=> baseCost + newWeigth * 2; 
}