//class syntax
//oop syntastic sugar
class User {
  static counter = 0; //accessable from the class only not from the instance(object)
  constructor(fName, lName, age) {
    this.firstName = fName;
    this.lastName = lName;
    this.age = age;
    //on each creation of the instance
    User.counter++;
    //cannot use this.counter cause this property has nothing todo with the user instance
    //it is accessable from the class only
  }
  getMyage() {
    return this.age;
  }
  getFullName() {
    return `${this.firstName} ${this.lastName}`; //template literal
  }
  sayHello() {
    console.log(`hello i am ${this.firstName} and my age is ${this.age}`); //template literal
  }
  static countNumber() {
    //cause of static here .. this refers to the class
    return this.counter;
  }
}
const user1 = new User("noor", "ahmed", 20);
console.log(user1);
console.log(user1.getMyage());
console.log(user1.getFullName());
user1.sayHello();
const user2 = new User("ahmed", "noor", 21);
console.log(user2, typeof User);
console.log(User === User.prototype.constructor);
console.log(User.counter);

//inheritance
class Fighter extends User {
  constructor(name, email, age, power, health) {
    // call the parent constructor and access the properties of it
    super(name, email, age);
    this.power = power;
    this.health = health;
  }
  fighterHello() {
    console.log(`hello i am ${this.name} and my age is ${this.age} and i am a fighter`); //template literal
  }
}

const fighter1 = new Fighter("noor", "ahmed@gmail", 20, 100, 100);
const fighter2 = new Fighter("ahmed", "noor@gmail", 21, 9000, 100);
console.log(fighter1.power, fighter2.power);
fighter2.fighterHello();
class Ninja extends Fighter {
  constructor(name, power, health) {
    super(power, health);
    this.skills = ["sneak", "steal", "fight"];
  }
}
