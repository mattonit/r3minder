'use strict';

chrome.alarms.create("reminder", {
  delayInMinutes: 1,
  periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "reminder") {
    var date    = new Date();
    var minute  = date.getMinutes();
    var hour    = date.getHours(); 
    if(hour === 13 && minute === 0) {
      chrome.notifications.create({
        type: 'basic',
        title: 'Sprint is over!',
        message: 'Check if anyone needs your help',
        iconUrl: 'img/slack.png'
      });

      chrome.notifications.onClicked.addListener(function() {
        chrome.tabs.create({ url: 'https://slack.com' });
      });

    } else if(minute === 45) {
      chrome.notifications.create({
        type: 'basic',
        title: 'Sprint is over!',
        message: 'Check if anyone needs your help',
        iconUrl: 'img/slack.png'
      });

      chrome.notifications.onClicked.addListener(function() {
        chrome.tabs.create({ url: 'https://slack.com' });
      });

    } else if(minute = 0) {
      chrome.notifications.create({
        type: 'basic',
        title: 'Sprint just started!',
        message: 'Turn off the Slack and stay focused!',
        iconUrl: 'img/slack.png'
      });
    }

  }
});