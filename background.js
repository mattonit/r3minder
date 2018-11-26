'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({slackURL: 'https://slack.com'}, function() {
    console.info('Changed Slack URL');
  });
});

chrome.alarms.create("reminder", {
  delayInMinutes: 1,
  periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "reminder") {
    var date    = new Date();
    var minute  = date.getMinutes();
    var hour    = date.getHours();
    var day     = date.getDay();

    // clear previous notifications
    chrome.notifications.getAll((items) => {
      if ( items ) {
        for (let key in items) {
          chrome.notifications.clear(key);
        }
      }
    });

    if(hour === 13 && minute === 45) {
      chrome.notifications.create({
        type: 'basic',
        title: 'Do domu?',
        message: 'Upewnij się, że odpowiedziałeś na wszystkie pytania',
        iconUrl: 'img/slack.png',
        requireInteraction: true
      });

    } else if(hour >= 6 && hour <= 13 && minute === 45) {
      chrome.notifications.create({
        type: 'basic',
        title: 'Koniec sprintu!',
        message: 'Sprawdź czy nikt nie potrzebuje Twojej pomocy na Slacku',
        iconUrl: 'img/boar128.png'
      });

    } else if(hour >= 6 && hour <= 13 && minute === 0) {
      chrome.notifications.create({
        type: 'basic',
        title: 'Sprint się zaczął!',
        message: 'Wyłączaj Slacka i do roboty!',
        iconUrl: 'img/horse128.png'
      });

      chrome.storage.local.get('slackURL', function(data) {
        var url = data.slackURL;
        chrome.notifications.onClicked.addListener(function() {
          chrome.tabs.create({ url: data.slackURL });
        });
      });
    }

  }
});