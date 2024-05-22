// ZP-TASK:

function majorityElement(arr: number[]): number {
	let obj: { [key: number]: number } = {};

	arr.forEach((e) => {
		if (obj[e]) {
			obj[e]++;
		} else {
			obj[e] = 1;
		}
	});

	let maxCount: number = 0;
	let majorityElem: string;

	for (let key in obj) {
		if (obj[key] > maxCount) {
			maxCount = obj[key];
			majorityElem = key;
		}
	}

	return parseInt(majorityElem);
}
console.log(majorityElement([1, 2, 3, 4, 5, 4, 3, 4]));
