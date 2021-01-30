// Can do everything that js do but even more 🚀

// Types

let words: string = 'Developer'
let num: number = 7
let bool: boolean;

// Default type of Javascript
let anyValue: any;

// reassigning
num = 22

bool = true

// Union

let year: string | number;

year = '2021'
year = 2021

// Arrays

let arr: string[] = ['a', 'b', 'c'];

// testing
// arr[0] = false not allowed
arr[0] = 'o'
// arr.push(7) not allowed
arr.push('u')

let arrNum: number[] = [1, 2, 3, 4];
let arrBool: boolean[] = [true, false];

let arrMix: (number | string | boolean)[] = [1, 'one', true]

arrMix[0] = 'fksdjl'
arrMix.push(false)

// For Certain types in certian spots ==> Tuples

let arrTup: [string, number] = ["String", 77];
// Here index 1 has to be a string and index 2 has to be number

arrTup = ["a", 9]

// Objects

let person = {
    name: 'John',
    age: 20
}

// Works
person.name = 'Doe'
person.age = 88
// person.name = 90 does not work
// person.age = '90' does not work
// person.email = '' does not exsits
// person = 'fsferuewrq' does not work

// Custom Types ==> Type aliases

type customtype = string | number;

let day: customtype;

day = 'Friday'
day = 5

function calcSum(a: number, b: number) {
    return a + b;
}
calcSum(5, 7); // Gonna return a number

// Arrow function defining function types

// Optional parameter third?: number ==> always gonna be at the end
let calcSub: (a: number, b: number, third?: number) => number;

// By default it returns void
calcSub = (first: number, second: number) => {
    // return 'someString' won't work
    return first - second;
}

calcSub(18, 4)

// Void
// This function returns nothing so its void...
const sayHi = () => {
    console.log('Hi')
}

// Interfaces

// Enforce certain structure of an object

interface PersonInterface {
    name: string,
    age: number,
    post: string
}

// For objects
let arkaraj: PersonInterface = {
    name: 'arkaraj',
    age: 18,
    post: 'admin'
}

class Person1 implements PersonInterface {
    // Private keyword
    public name: string;
    public age: number;
    // private post: string
    public post: string
    // email: string wont work

    constructor(s: string, num: number, p: string) {
        this.name = s;
        this.age = num;
        this.post = p
    }

    greet() {
        return `Hi, my name is ${this.name}, and i am ${this.age}`
    }

    sayPost() {
        return `Assigned to post: ${this.post}`
    }
}

let john = new Person1('john', 20, 'customer')
// can't access attribuites in private visibility mode

// DOM manipulation & type casting

const inputName = document.querySelector('#name') as HTMLInputElement;
const inputAge = document.querySelector('#age') as HTMLInputElement;
// No need Typecasting here as ts recognizes form as input element
const inputForm = document.querySelector('form');

const greet = document.querySelector('.greet') as HTMLDivElement;

// The ? is for ts possibility that inputForm maybe null i.e no element like that even exsits

// To ensure that the element is there we can use ! sign
// const inputForm = document.querySelector('form')! => this says that inputForm is for sure there and you don't need that ?

inputForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    // parseInt(inputAge) also works
    const personn = new Person1(inputName.value, inputAge.valueAsNumber, 'customer')

    greet.innerText = personn.greet();

    inputForm.reset();

});

// Generics
// When we don't know what type something might be

// T -> placeholder
function xyz<T>(arg1: T) {
    // Do some stuff here
    return arg1;
}

xyz('5')
xyz(5)

// Gonna fail
// xyz<string>(3) --> expects string argument

// With interfaces

interface book<T> {
    id: number
    name: string,
    data: T
}

const abook: book<string> = {
    id: 100122,
    name: "Abook122",
    data: "wrewewtgfds"
}

// Enums

// A way to assign a descriptive word to a numeric value 

enum Professions { DOCTOR, ARTIST, DANCER, ARCHITECT, ENGINEER, TEACHERS }

const myCareer = {
    year: 2021,
    career: Professions.ENGINEER // 4
}