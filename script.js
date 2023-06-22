'use strict';

document.addEventListener('keydown', function (e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    let key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
});

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
};

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

// METRONOME

// declarations
let recordImage = document.querySelector(`div[id="001"]`);
const bpmAudio = document.querySelector(`audio[data-key="01"]`);
let metronomeBtn = document.querySelector('.metronome-btn');
let stopMetronome = document.querySelector('.stop');
let timer = document.querySelector('.timer');
let [mValue, seconds, minutes] = [0, 0, 0];

// Functions for updating min, sec and m-sec views
function mSecDisplay(mSecVal) {
  document.querySelector('.m-second-val').textContent = mSecVal;
};

function secondDisplay(secVal) {
  document.querySelector('.second-val').textContent = secVal;
};

function minuteDisplay(minuteVal) {
  document.querySelector('.minute-val').textContent = minuteVal;
};

// the function helped to control the displaying of metronome section
function displayTimer(showOrNot) {
  if (showOrNot) {
    document.querySelector('.bpm-val').value = ' ';
    metronomeBtn.classList.add('show');
    stopMetronome.classList.remove('show');
    recordImage.classList.add('hidden');
    timer.classList.remove('show');
  } else {
    metronomeBtn.classList.remove('show');
    stopMetronome.classList.add('show');
    recordImage.classList.remove('hidden');
    timer.classList.add('show');
  };
};

// the function used with setinterval function. 
// setinterval function is working per 10 milliseconds and after that 
// the watch function will update msecond, second, and minute. 
function watch() {
  mValue += 10;
  mSecDisplay(Math.round(mValue / 10));
  if (mValue >= 999) {
    mValue = 0;
    seconds++;
    secondDisplay(seconds);
    if (seconds === 59) {
      seconds = 0;
      minutes++;
      minuteDisplay(minutes);
    }
  }
};

// The function starts the 2 different timers. 
// The first timer helps for the update to watch function
// and the other timer helps to metronome start.
function timerIntervals(interval) {
  let watchInterval = setInterval(watch, 10);
  let audioInterval = setInterval(function () {
    bpmAudio.play();
    }, interval);
  // when the user click to the STOP button
  stopMetronome.addEventListener('click', function () {
    displayTimer(false);
    clearInterval(watchInterval);
    clearInterval(audioInterval);
  });
};

// includes the all actions when the user start to the metronome
function metronomeClick() {
  let bpmInput = document.querySelector('.bpm-val').value;
  let interval = 60000 / Number(bpmInput);
  if ((interval) && (interval != Infinity)) {
    displayTimer(true);
    timerIntervals(interval);
  } else {console.log(bpmInput);};
};

// when the user click to the START button
metronomeBtn.addEventListener('click', function () {
  [mValue, seconds, minutes] = [0, 0, 0];
  mSecDisplay('00');
  secondDisplay('00');
  minuteDisplay('00');
  metronomeClick();
});
