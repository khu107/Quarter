// ZL-TASK:

function stringToKebab(str: string) {
	return str.toLowerCase().replaceAll(' ', '-');
}

console.log(stringToKebab('I love Kebab'));
