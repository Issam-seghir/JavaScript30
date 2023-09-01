// Initialize variables
let countdown; // Stores the interval ID for the countdown timer
const timerDisplay = document.querySelector(".display__time-left"); // Display element for remaining time
const endTime = document.querySelector(".display__end-time"); // Display element for end time
const buttons = document.querySelectorAll("[data-time]"); // Select all buttons with 'data-time' attribute

// Function to start a countdown timer
function timer(seconds) {
	// Clear any existing timers
	clearInterval(countdown);

	// Calculate the target end time
	const now = Date.now();
	const then = now + seconds * 1000;

	// Display initial time
	displayTimeLeft(seconds);
	displayEndTime(then);

	// Start the countdown timer
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);

		// Check if we should stop the timer
		if (secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}

		// Display the remaining time
		displayTimeLeft(secondsLeft);
	}, 1000);
}

// Function to display the remaining time
function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
	document.title = display; // Update the browser tab title
	timerDisplay.textContent = display; // Update the displayed time
}

// Function to display the end time
function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const adjustedHour = hour > 12 ? hour - 12 : hour;
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? "0" : ""}${minutes}`;
}

// Function to start a timer based on button click
function startTimer() {
	const seconds = Number.parseInt(this.dataset.time);
	timer(seconds);
}

// Event listeners for button clicks
buttons.forEach((button) => button.addEventListener("click", startTimer));

// Event listener for custom form submission
document.customForm.addEventListener("submit", function (e) {
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60); // Convert minutes to seconds and start the timer
	this.reset(); // Reset the form
});
