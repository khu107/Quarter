function reduceNestedArray(arr: (number | any)[]): number {
	return arr.reduce((acc, curr) => {
		if (typeof curr === 'number') {
			return acc + curr;
		} else if (Array.isArray(curr)) {
			return acc + reduceNestedArray(curr);
		} else {
			return acc;
		}
	}, 0);
}

console.log(reduceNestedArray([1, [1, 2, [4]]]));
