const initialCart = [
  { id: 1, name: "Teclado mecánico", price: 89.99, quantity: 1 },
  { id: 2, name: "Ratón inalámbrico", price: 45.5, quantity: 2 }
];

const itemToAdd = { id: 2, name: "Ratón inalámbrico", price: 45.5, quantity: 1 };
const anotherItem = { id: 3, name: "Alfombrilla XL", price: 19.95, quantity: 1 };

function addItemToCart(cart, newItem){
    const exite = cart.some(n=> n.id === newItem.id);

    if(exite){
        return cart.map(n=>{
            if(n.id === newItem.id){
                return {...n, quantity:n.quantity + newItem.quantity}
            }
            return n
        })
    }else{
        return [...cart, {...newItem}]
    }


}

function calculateCartTotal(cart, discountRate = 0){
    let total = cart.reduce((acumulador, actual) =>{
        return acumulador + actual.price * actual.quantity;
    },0);
    const discountedTotal = total *(1- discountRate)
    return Math.round(discountedTotal * 100) / 100;
    
}

function removeItemFromCart(cart, itemId){
    return cart.map(n=>n.id === itemId ? {...n, quantity: n.quantity -1}:n)
        .filter(n=>n.quantity>0)
}

let lista1 = addItemToCart(initialCart, itemToAdd);
let lista2 = addItemToCart(initialCart, anotherItem);
console.log(lista2);

total = calculateCartTotal(initialCart, 0.15);
console.log(total);

let lista3 = removeItemFromCart(initialCart, 1)
console.log(lista3);
