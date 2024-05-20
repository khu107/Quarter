// ZO-TASK:

function areParenthesesBalanced(arr: string): boolean {
	let ochish: number = 0;
	let yopish: number = 0;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === '(') {
			ochish += 1;
		} else if (arr[i] === ')') {
			yopish += 1;
		}
	}
	console.log(ochish, yopish);

	return ochish === yopish ? true : false;
}

console.log(areParenthesesBalanced('string()ichida(qavslar)soni()balansda'));
