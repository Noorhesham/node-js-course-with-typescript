let user = {
  name: "noor",
  age: 20,
  address: {
    city: "cairo",
    country: "egypt",
    ksa: "riyadh",
    usa: "new york",
    getMainAddress: function (country) {
      if (country === "egypt") {
        return this.ksa;
      } else {
        return this.usa;
      }
    },
    getMainArrow: (country) => {
      //error
      if (country === "egypt") {
        return this.ksa;
      } else {
        return this.usa;
      }
    },
  },
  one: () => {
    console.log(this);
  },
  // dot notation error
  "Two!": () => {
    console.log(this);
  },
  //dot notation error
  1: "i am a number",
  getMyage: function () {
    return this.age;
  },
};
const myVar = "name";
console.log(user.myVar, user.address.myVar, user.address["myVar"], user.address[myVar]);

let otherObj = Object.create(user);
otherObj.age = 22;
console.log(otherObj.getMyage(), user.getMyage());

const src = {
  prop1: 1,
  prop2: 2,
};
const src2 = {
  prop3: 1,
  prop4: 2,
};
const dest = {
  prop1: 3,
  prop2: 4,
};
// i can use target as {}
const target = Object.assign(dest, src, src2, { prop6: "meow" });
const myObj = Object.assign({}, target);
console.log(dest, target, myObj);

//delete operator
const deletedUser = { name: "naruto" };
console.log(deletedUser);
delete deletedUser.name; //it works
//
const freezer = Object.freeze({ name: "itatchi" });
console.log(delete freezer.name);

//for in loop
for (const key in user) {
  console.log(key, user[key]);
}

//classes
const user1 = {
  name: "noor",
  age: 20,
};
const user2 = {
  name: "ahmed",
  age: 20,
};
const user3 = {
  name: "mohamed",
  age: 20,
};
//painful !
//best practice using capital letters as start
//the function is like a blue print or stamp for other objects to create from
function User(fName, lName, age) {
  this.firstName = fName;
  this.lastName = lName;
  this.age = age;
  this.fullName = function () {
    return `${this.firstName} ${this.lastName}`;
  };
}
const user1Class = new User("noor", "ahmed", 20);
const user2Class = new User("ahmed", "noor", 21);
console.log(user1Class.fullName(), user2Class.fullName());

//constructor
function Fighter(power, health) {
  console.log(this); // this happend on each creation from the constructor function
  function isOver9000() {
    return this.power > 9000;
  }
  this.power = power;
  this.health = health;
  this.isOver9000 = isOver9000;
}
const fighter1 = new Fighter(100, 100);
const fighter2 = new Fighter(9000, 100);
const fighter3 = Fighter(100, 100); //without new !
console.log(fighter1.power, fighter2.power, fighter3.power);
console.log(window.power);

console.log(fighter1 instanceof Fighter); //true
console.log(fighter3 instanceof Fighter); //true
console.log(fighter1.constructor === Fighter); //true
console.log(fighter3.constructor === Fighter);

function helloToPerson(person) {
  return `Hello ${person}`;
}
function Userupdated(name, age) {
  this.name = name;
  this.age = age;
  this.isEmailVisible = true;
  this.UpdateName = function (newName) {
    this.name = newName;
  };
  isEmailValid = function (email) {
    return email.includes("@");
  };
  toggleEmailVisibility = function () {
    this.isEmailVisible = !this.isEmailVisible;
  };
}
const user4 = new Userupdated("noor", 20);
user4.UpdateName("ahmed");
console.log(user4);
user4.toggleEmailVisibility();
console.log(user4);

//built in constructors
const date = new Date();
console.log(date);

const myArray = new Array(1, 2, 3);
console.log(myArray);

const mmyString = new String("noor");
const string2 = "meow";
console.log(mmyString);
const myNUmber = new Number(10);
console.log(myNUmber);
//access the string conscructor
//who created this function ?  the constructor is gonna tell u who
console.log(String.prototype, mmyString.constructor, string2.constructor);

//prototypes
//default value for each object or any function (functionas are objects in js )
console.log(User.prototype, Fighter.prototype, helloToPerson.prototype);
//the prototype is an object that has constructor function key and the value is the function i created
//all objects created from the function will inherit the props from the constructor function
// كل الاوبجيكتس المتكونه من الفانكشن بتقدر تورث الخواص الموجوده عليها
const arr = [1, 2, 3]; // this is an instance of the array constructor so that inherit all the props from the array prototype
console.log(Array.prototype);

Object.prototype.noor = "noor";
console.log(arr.noor, arr.constructor.prototype.noor, user.noor);

let MyNaruto = "Noroto";
String.prototype.zfill = function (width) {
  const result = this;
  while (result.length < width) {
    result = `0${result}`;
  }
  return result.toString();
};
console.log("12".zfill(10));
String.prototype.sayYouLoveMe = function () {
  return `I love you ${this}`;
};
console.log(MyNaruto.sayYouLoveMe());

//arrays and function has the prototype of object

function Food(name) {
  //crate empty object
  //assign new object to this
  //this ={}
  //this.__proto__ = Food.__proto__
  if (!(this instanceof Food)) {
    return new Error("use the new keyword");
  }
}

const food = Food();
