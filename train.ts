// ZU-TASK:

function sumOfUnique(nums: number[]): number {
	const ob: Record<number, number> = {};

	nums.forEach((n) => {
		if (ob[n]) {
			ob[n] += 1;
		} else {
			ob[n] = 1;
		}
	});

	let sum = 0;
	for (let key in ob) {
		if (ob[key] === 1) {
			sum += Number(key);
		}
	}
	return sum;
}

console.log(sumOfUnique([1, 2, 3, 2]));
