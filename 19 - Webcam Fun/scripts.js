const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const context = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

// Access the user's camera and display video stream on the page
function getVideo() {
	navigator.mediaDevices
		.getUserMedia({ video: true, audio: false })
		.then((localMediaStream) => {
			console.log(localMediaStream);
			video.srcObject = localMediaStream;
			video.play();
		})
		.catch((error) => {
			console.error(`OH NO!!!`, error);
		});
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	return setInterval(() => {
		context.drawImage(video, 0, 0, width, height);
		// take the pixels out
		let pixels = context.getImageData(0, 0, width, height);
		// mess with them
		// pixels = redEffect(pixels);

		pixels = rgbSplit(pixels);
		// ctx.globalAlpha = 0.8;

		// pixels = greenScreen(pixels);
		// put them back
		context.putImageData(pixels, 0, 0);
	}, 16);
}

// Capture a photo from the current canvas and display it
function takePhoto() {
	// played the sound
	snap.currentTime = 0;
	snap.play();

	// take the data out of the canvas
	const data = canvas.toDataURL("image/jpeg");
	const link = document.createElement("a");
	link.href = data;
	link.setAttribute("download", "handsome");
	link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
	strip.insertBefore(link, strip.firstChild);
}

// Apply a red color effect to pixels
function redEffect(pixels) {
	for (let index = 0; index < pixels.data.length; index += 4) {
		pixels.data[index + 0] = pixels.data[index + 0] + 200; // RED
		pixels.data[index + 1] = pixels.data[index + 1] - 50; // GREEN
		pixels.data[index + 2] = pixels.data[index + 2] * 0.5; // Blue
	}
	return pixels;
}

// Apply an RGB split effect to pixels
function rgbSplit(pixels) {
	for (let index = 0; index < pixels.data.length; index += 4) {
		pixels.data[index - 150] = pixels.data[index + 0]; // RED
		pixels.data[index + 500] = pixels.data[index + 1]; // GREEN
		pixels.data[index - 550] = pixels.data[index + 2]; // Blue
	}
	return pixels;
}

// Apply a green screen effect to pixels
function greenScreen(pixels) {
	const levels = {};

	// Extract RGB level values from input elements
	document.querySelectorAll(".rgb input").forEach((input) => {
		levels[input.name] = input.value;
	});

	for (i = 0; i < pixels.data.length; i = i + 4) {
		red = pixels.data[i + 0];
		green = pixels.data[i + 1];
		blue = pixels.data[i + 2];
		alpha = pixels.data[i + 3];

		// Check if pixel values fall within the specified range
		if (red >= levels.rmin && green >= levels.gmin && blue >= levels.bmin && red <= levels.rmax && green <= levels.gmax && blue <= levels.bmax) {
			// Make pixel transparent
			pixels.data[i + 3] = 0;
		}
	}

	return pixels;
}

// Start capturing video from the user's camera
getVideo();

video.addEventListener("canplay", paintToCanvas);
