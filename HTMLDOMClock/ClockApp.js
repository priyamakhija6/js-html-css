// Retrieve the DOM elements that'll be updated every second
const secondsElement = document.querySelector('.seconds');
const minutesElement = document.querySelector('.minutes');
const hoursElement = document.querySelector('.hours');

function setRotation(element, degrees) {
    // Set the rotation and add 90 to default from 12am
    element.style.transform = `rotate(${degrees+90}deg)`;
}

function updateClockHandsToCurrentTime() {
    // get the current time
    const now = new Date();

    // break it down to hours, minutes and seconds
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // calc the rotation of each clock hand in degrees
    const secondsRotationDegrees = (seconds * 360) / 60;
    const minutesRotationDegrees = (minutes * 360) / 60 // + (seconds/60) * 6;
    const hoursRotationDegrees = (hours * 360 ) / 12 //+ (minutes/60) * 30; + (min * 360) / (12 * 60)

    setRotation(secondsElement, secondsRotationDegrees);
    setRotation(minutesElement, minutesRotationDegrees);
    setRotation(hoursElement, hoursRotationDegrees);
}

// Set the initial clock state, and update it every second
setInterval(updateClockHandsToCurrentTime, 10);
updateClockHandsToCurrentTime();

