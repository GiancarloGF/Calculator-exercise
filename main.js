// ------Variables Globales
let result= 0; //Guardamos el esultado de nuestra operacion.
let buffer= '0';//Guardamos la concatenacion de operaciones para luego pintarlo en pantalla.
let prevOperator;// Guardamos el ultimo operador de la operacion actual.

// ------Referencias a elementos html
const calculator=document.querySelector('.calculator');//Referenciamos al div padre para usar la delegacion de eventos.
const screen= document.querySelector('.calculator__result')//Referenciamos al elemento que muestra lo que vamos clickeando.

// ------Funciones

// Primera callback
function buttonClick(stringValue){//Recibimos el string como parametro
    if (isNaN(parseInt(stringValue))) {//Al string lo convertimos en entero y validamos si es numero u otro cosa diferente.
        handleOther(stringValue);
    } else {
        handleNumber(stringValue);
    }


    function printToScreen(){
        screen.innerText=buffer;
    };

    printToScreen();
};



// Funcion que manejara el valor que es un numero.
function handleNumber(numberAssString){
    if (buffer==='0') {//Si no hemos clickeado ningun valor

        buffer = numberAssString;//Entonces, al buffer le colocamos el primer valor

    } else {//Si el buffer es diferente de 0 significa que ya hemos clickeado un primer valor
        
        buffer += numberAssString;//Por lo tanto sumamos el primer valor con el nuevo.
    }


};

// Funcion que manejara el valor que es otra cosa que no sea numero.
function handleOther(otherAssString){//Aqui separare los operadores matematicos con los extras.
    switch (otherAssString) {
        case 'C':
            buffer='0';//El buffer en 0 para que no se pinte nada en pantalla
            result=0;//Reiniciamos la operacion
            break;
        case '=':
            if (prevOperator===null) {//Validamos que se haya colocado una expresion matematica 
                return;
            } else {
                executeOperation(parseInt(buffer));
                prevOperator=null;
                buffer=result;
                result=0;
            }
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = "0";
              } else {
                buffer = buffer.substring(0, buffer.length - 1);
              }
            break;
        case '+':
        case '-':
        case 'x':
        case '/':
            handleMath(otherAssString);
            break; 
    }
};


// Funcion que manejara el valor de los operadores matematicos.
function handleMath(otherAssString){//
    if (buffer==='0') {
        return alert('Apreta un numero primero');//verificamos si el primer click es un numero, si no es no ejecutamos nada.
    }
    const currentIntegerBuffer= parseInt(buffer);//Guardamos el valor del buffer (parseado a numero) actual(antes del signo clickeado) como nuestro primer numero para luego realizar la operacion matematica.
    if (result===0) {//Si nuestro resultado es 0, significa que es el primer operador
        result=currentIntegerBuffer;//Entonces, esperamos al siguiente numero y reasignamos el valor del resultado, y tenemos el primer numero.
    }else{// Si el resultado es diferente de 0, significa que estamos en el siguiente operador
        executeOperation(currentIntegerBuffer);
    }
     
    prevOperator=otherAssString;
    buffer='0'; 

};

function executeOperation(lastIntBuffer){
    if (prevOperator==='+') {
        result +=lastIntBuffer; 
    } else if(prevOperator==='-'){
        result -=lastIntBuffer;
    }else if (prevOperator==='x') {
        result *=lastIntBuffer;
    }else{
        result /=lastIntBuffer;
    }
};



// -------Eventos
calculator.addEventListener('click',function(e){//Al hacer click, tomamos referencia del item al que se ha hecho click y lo guardamos en e.
    buttonClick(e.target.innerText);//Llamamos a otra funcion y le pasamos el string que hay como texto en cada item.
    console.log(buffer);
});






