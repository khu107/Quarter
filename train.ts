// ZR-TASK:

function countNumberAndLetters(input: string): { number: number; letter: number } {
	let numberCount = 0;
	let letterCount = 0;

	for (let char of input) {
		if (char >= '0' && char <= '9') {
			numberCount++;
		} else if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
			letterCount++;
		}
	}

	return {
		number: numberCount,
		letter: letterCount,
	};
}
const result = countNumberAndLetters('string152%¥');
console.log(result);
