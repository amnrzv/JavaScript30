const displayTime = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

let countdown;
function timer(seconds) {
  if (countdown) clearInterval(countdown);
  
  displayTimeLeft(seconds);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  console.log({mins, secs});
  const display = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  displayTime.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);

  const hours = end.getHours();
  const mins = end.getMinutes();

  endTime.textContent = `Ends at ${hours}:${mins < 10 ? '0': ''}${mins}`;
}

const buttons = document.querySelectorAll('.timer__button');
buttons.forEach(button => button.addEventListener('click', (e) => timer(e.target.dataset.time)));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  timer(parseInt(this.minutes.value) * 60);
  this.reset();
})