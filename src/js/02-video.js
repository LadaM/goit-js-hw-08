'use strict';
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const CURRENT_TIME_KEY = 'videoplayer-current-time';

const saveCurrentTime = throttle((currentTime) => {
  localStorage.setItem(CURRENT_TIME_KEY, currentTime);
}, 1000); // Update once a second or less frequently

player.on('timeupdate', function(event) {
  saveCurrentTime(event.seconds);
});

// starting the video at the saved time
const savedTime = localStorage.getItem(CURRENT_TIME_KEY);
if (savedTime) {
  player.setCurrentTime(savedTime).catch(function(error) {
    console.error('Error setting the current time:', error);
  });
}