
function add (num1, num2) {
	let res = num1 + num2
	return res
}

function subtract (num1, num2) {
	let res = num1 - num2
	return res
}

function sum (...nums) {
	let res = nums.reduce((num1, num2) => num1 + num2)
	return res
}

function multiply (...nums) {
	let res = nums.reduce((num1, num2) => num1 * num2)
	return res
}

function power (num1. num2) {
	let res = Math.power (num1, num2)
	return res
}

function factorial(num) {
  if (num < 0)
        return -1;
  else if (num == 0)
      return 1;
  else {
      return (num * factorialize(num - 1));
  }
}
