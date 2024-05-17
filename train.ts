// ZM-TASK:

function rotateArray(arr: number[], index: number): number[] {
	const rotated: number[] = [];
	const len: number = arr.length;
	index = (index - 1) % len;

	for (let i = len - index; i < len; i++) {
		rotated.push(arr[i]);
	}

	for (let i = 0; i < len - index; i++) {
		rotated.push(arr[i]);
	}

	return rotated;
}

const result: number[] = rotateArray([1, 2, 3, 4, 5, 6], 3);
console.log(result); // [5, 6, 1, 2, 3, 4]
