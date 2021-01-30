"use strict";
// Can do everything that js do but even more 🚀
// Types
var words = 'Developer';
var num = 7;
var bool;
// Default type of Javascript
var anyValue;
// reassigning
num = 22;
bool = true;
// Union
var year;
year = '2021';
year = 2021;
// Arrays
var arr = ['a', 'b', 'c'];
// testing
// arr[0] = false not allowed
arr[0] = 'o';
// arr.push(7) not allowed
arr.push('u');
var arrNum = [1, 2, 3, 4];
var arrBool = [true, false];
var arrMix = [1, 'one', true];
arrMix[0] = 'fksdjl';
arrMix.push(false);
// For Certain types in certian spots ==> Tuples
var arrTup = ["String", 77];
// Here index 1 has to be a string and index 2 has to be number
arrTup = ["a", 9];
// Objects
var person = {
    name: 'John',
    age: 20
};
// Works
person.name = 'Doe';
person.age = 88;
var day;
day = 'Friday';
day = 5;
function calcSum(a, b) {
    return a + b;
}
calcSum(5, 7); // Gonna return a number
// Arrow function defining function types
// Optional parameter third?: number ==> always gonna be at the end
var calcSub;
// By default it returns void
calcSub = function (first, second) {
    // return 'someString' won't work
    return first - second;
};
calcSub(18, 4);
// Void
// This function returns nothing so its void...
var sayHi = function () {
    console.log('Hi');
};
// For objects
var arkaraj = {
    name: 'arkaraj',
    age: 18,
    post: 'admin'
};
var Person1 = /** @class */ (function () {
    // email: string wont work
    function Person1(s, num, p) {
        this.name = s;
        this.age = num;
        this.post = p;
    }
    Person1.prototype.greet = function () {
        return "Hi, my name is " + this.name + ", and i am " + this.age;
    };
    Person1.prototype.sayPost = function () {
        return "Assigned to post: " + this.post;
    };
    return Person1;
}());
var john = new Person1('john', 20, 'customer');
// can't access attribuites in private visibility mode
// DOM manipulation & type casting
var inputName = document.querySelector('#name');
var inputAge = document.querySelector('#age');
// No need Typecasting here as ts recognizes form as input element
var inputForm = document.querySelector('form');
var greet = document.querySelector('.greet');
// The ? is for ts possibility that inputForm maybe null i.e no element like that even exsits
// To ensure that the element is there we can use ! sign
// const inputForm = document.querySelector('form')! => this says that inputForm is for sure there and you don't need that ?
inputForm === null || inputForm === void 0 ? void 0 : inputForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // parseInt(inputAge) also works
    var personn = new Person1(inputName.value, inputAge.valueAsNumber, 'customer');
    greet.innerText = personn.greet();
    inputForm.reset();
});
