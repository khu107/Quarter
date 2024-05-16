// ZM-TASK:

function reverseInteger(num: number) {
	let changeStr = String(num).split('').reverse().join('');
	return +changeStr;
}

console.log(reverseInteger(123456789));
