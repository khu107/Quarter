// ZT-TASK:

function firstUniqueCharIndex(s: string): number {
	const charCount: { [key: string]: number } = {};

	for (let i = 0; i < s.length; i++) {
		const char = s[i];
		if (charCount[char] === undefined) {
			charCount[char] = 1;
		} else {
			charCount[char]++;
		}
	}

	for (let i = 0; i < s.length; i++) {
		if (charCount[s[i]] === 1) {
			return i;
		}
	}

	return -1;
}

console.log(firstUniqueCharIndex('stamp'));
