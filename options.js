// Options

$(function() {

  chrome.storage.local.get('slackURL', function(data) {

    var url = data.slackURL;
    $('#slack').focus().val(url).blur();

  });
});

$('form#options').on('submit', function(e) {
  
  e.preventDefault();
  var slackURL = $('#slack').val();
  chrome.storage.local.set({slackURL: slackURL});
  alert('Zapisano!');

});