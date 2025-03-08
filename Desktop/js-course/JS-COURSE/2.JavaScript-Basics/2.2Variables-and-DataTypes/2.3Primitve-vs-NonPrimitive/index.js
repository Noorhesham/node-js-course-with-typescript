// الدرس الأول: أنواع البيانات (Number)
let num1 = 42; // رقم صحيح (Integer)
let num2 = 3.14; // رقم عشري (Floating-point)
let num3 = Infinity; // قيمة لا نهائية
let num4 = NaN; // ليس رقمًا (Not a Number)

console.log(typeof num1, typeof num2, typeof num3); // "number" "number" "number"
console.log(10 / "hello"); // NaN
console.log(10 / 0); // Infinity
console.log(0.1 + 0.2); // نتيجة غير دقيقة بسبب طبيعة الأعداد العشرية

// الدرس الثاني: النصوص (String)
const obj = { name: "noor" };
let str1 = "Hello";
let str2 = "World";
let str3 = `Template ${str1}`; // استخدام القوالب النصية (Template literals)
let str4 = "template" + str1;
console.log(str1.length); // طول النص
console.log(str1.toUpperCase()); // تحويل إلى حروف كبيرة
console.log(str1[0]); // الوصول إلى أول حرف
console.log("JavaScript".slice(2, 4)); // تقطيع النص

// الدرس الثالث: الكائنات (Objects)
const person = {
  name: "noor",
  age: 123123,
  job: "fullstack dev",
};
person.address = "cairo";
console.log(person["name"], person.address);

// الدرس الرابع: الدوال (Functions)
function add(num1 = 1, num2 = 4) {
  console.log(num1, num2);
  return num1 + num2;
}
const result = add(10);
console.log(result);

// الدرس الخامس: المقارنات والمراجع (References)
let obj1 = { name: "Peter" };
let obj2 = obj1; // تمرير بالمرجع وليس نسخة
obj2.name = "Spider-Man";
console.log(obj1.name); // "Spider-Man"

// الدرس السادس: التحويل بين الأنواع (Type Conversion)
const x = 1;
console.log(x.toString(), String(x), x + "", x);
console.log(Number("")); // 0
console.log(Number(" ")); // 0

// الدرس السابع: الشروط (Conditions)
function isOddOrEven(num) {
  return num % 2 === 0 ? "even" : "odd";
}

const isLoggedIn = false;
const isAuthorized = false;
if (isLoggedIn && isAuthorized) console.log("hello");

// الدرس الثامن: العمليات المنطقية (Logical Operators)
console.log(true && false); // false
console.log(5 && 0); // 0
console.log("Hello" && 42); // 42
console.log(undefined && "World"); // undefined

console.log(false || "Fallback"); // "Fallback"
console.log(0 || 42); // 42
console.log(null || undefined || "Hello"); // "Hello"
console.log("JS" || "Python"); // "JS"

// الدرس التاسع: التفاعل مع الـ DOM
let bank = 0;
const user = {
  name: "naruto",
  age: 12,
  hasMoney: true,
  moneyValue: 10,
  bank: 500,
};

if (user.moneyValue > 0 && user.hasMoney) user.bank += user.moneyValue;
console.log(user.bank);

const input = document.getElementById("money");
const form = document.getElementById("submit");
let value;
input.addEventListener("input", function (e) {
  value = e.target.value;
  console.log(value);
});

const ui = document.querySelector("#bank");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  user.bank += Number(value);
  ui.innerHTML = `<span>${user.name} current bank is : ${user.bank}</span>`;
  console.log(user.bank);
});


