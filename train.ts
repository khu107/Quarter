// ZK-TASK:

function printNumbers() {
	const interval = setInterval(() => {
		for (let i = 1; i <= 5; i++) {
			console.log(i);
		}
	}, 1000);
	setTimeout(() => {
		clearTimeout(interval);
	}, 5000);
}

printNumbers();
