// ZQ-TASK:

function findDuplicates(nums: number[]): number[] {
	const duplicates: number[] = [];
	const seen: Set<number> = new Set();
	const seenDuplicates: Set<number> = new Set();

	for (const num of nums) {
		if (seen.has(num) && !seenDuplicates.has(num)) {
			duplicates.push(num);
			seenDuplicates.add(num);
		}
		seen.add(num);
	}

	return duplicates;
}

console.log(findDuplicates([1, 2, 3, 4, 5, 4, 3, 4]));
