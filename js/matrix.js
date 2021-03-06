/* Constants */
const X_SPACING = 20;
const Y_SPACING = 20;
const FONT_SIZE = 25;

/* Initialization */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const charSet = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789:・."=*+-<>¦｜çﾘｸ';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.font = FONT_SIZE + "px Monospace";

ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;

/* Functions */
function dropChars(x) {
	let y = 0;

	const id = setInterval(() => {
		const randIndex = ~~(Math.random() * charSet.length);
		const char = charSet[randIndex]; // Pick random char

		// Shadow
		ctx.shadowBlur = 10;
		ctx.shadowColor = "#0F0";

		// Color
		ctx.fillStyle = "#0F0";

		// Draw single char
		ctx.fillText(char, x, (y += Y_SPACING));

		if (y >= canvas.height) clearInterval(id); // Clear interval once reached bottom
	}, 50);
}

function rainChars() {
	setTimeout(() => {
		const randY = ~~((Math.random() * canvas.width) / X_SPACING) * X_SPACING; // Generate random X coordinate with desired spacing

		dropChars(randY); // Drop single column

		// Shadow
		ctx.shadowBlur = 0;
		ctx.shadowColor = "rgba(0, 0, 0, 0)";

		// Color
		ctx.fillStyle = "rgba(0, 0, 0, 0.1)";

		// Draw over everything, fades out chars
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		rainChars(); // Repeat
	}, 50);
}

/* Cool animation */
for (let y = 0; y < canvas.width; y += Y_SPACING) {
	setTimeout(() => {
		dropChars(y);
	}, y);
}

/* Let it rain! */
setTimeout(() => {
	rainChars();
}, 2000);
