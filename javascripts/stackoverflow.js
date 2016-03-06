window.onload = (function(document) {
  var request = new XMLHttpRequest();
  var container = document.getElementById('content-container');
  request.open('GET', 'https://api.stackexchange.com/2.2/questions/unanswered?page=1&pagesize=20&order=desc&sort=activity&tagged=emberjs&site=stackoverflow', true);

  request.onload = function() {
    var questions = '';
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      if (data && data.items.length) {
        data.items.forEach(function(question) {
          if (question.link && question.title) {
            questions += `<div class="so-container__question"><a class="so-container__link" href=${question.link} target="_blank">${question.title}</a></div>`;
          }
        });
      } else {
        questions = "<div><p class='info'>There are no unanswered questions tagged with ember.js at this time.</div>";
      }
    } else {
      questions = "<div><p class='alert'>An error has occured! Please try again later</div>";
    }
    container.insertAdjacentHTML('beforeEnd', questions);
  };

  request.send();
}(document));
