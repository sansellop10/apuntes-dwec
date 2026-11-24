function crearContador(valorInicial=0){
    let historial = []
    let actual = valorInicial;
    function incrementar(paso=1){
        actual+=paso;
        historial.push(actual);
        return actual;
    }
    function decrementar(paso=1){
        actual-=paso;
        historial.push(actual);
        return actual
    }
    function deshacer(){
        if(historial.length===0){
            return actual
        }
        return historial.pop()
    }
    return{
        incrementar, decrementar, deshacer
    }
}

let contador = crearContador(10);
console.log(contador.incrementar(2));
console.log(contador.decrementar(1));
console.log(contador.deshacer());


