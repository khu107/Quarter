// ZS-TASK:

function singleNumber(nums: number[]): number {
	let result: number = 0;
	for (let num of nums) {
		result ^= num;
	}
	return result;
}

console.log(singleNumber([4, 2, 1, 2, 1]));
