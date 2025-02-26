module.exports = {
	consoleLogCustom: (message1, color1 = "red", message2, color2 = "green") => {
		const colors = {
			red: "\x1b[31m",
			orange: "\x1b[38;5;214m", // ANSI code for orange
			purple: "\x1b[35m",
			green: "\x1b[32m",
			reset: "\x1b[0m",
		};

		if (!message2) {
			const colorCode1 = colors[color1] || colors.red; // Default to red
			console.log(`${colorCode1}%s${colors.reset}`, message1);
			return;
		}

		const colorCode1 = colors[color1] || colors.red; // Default to red
		const colorCode2 = colors[color2] || colors.green; // Default to green

		console.log(
			`${colorCode1}%s${colors.reset} ${colorCode2}%s${colors.reset}`,
			message1,
			message2
		);
	},
};
