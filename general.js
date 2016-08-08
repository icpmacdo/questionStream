$( document ).ready(function() {

var distToBottom;
var pageNumber = 1;
var pollingData = false;
var url;
var getQuestionsFromLoad = Math.round(new Date().getTime() / 1000);

function loadQuestions(){
  
  url = "https://api.stackexchange.com/2.2/questions?page=" + pageNumber + "&pagesize=15&max=" + getQuestionsFromLoad + "&order=desc&sort=creation&site=stackoverflow"
  pageNumber += 1;
  console.log(url);

  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    cache: false,
    success: function(data){
  	  console.log(data);
  	  var questionItems = [];
        for(var key in data.items) {
		  questionItems.push('<div class="questionCard"> <h2><a href="' + data.items[key].link + ' ">' + data.items[key].title + '</a></h2>  <p> Submitted by: <a href="' + data.items[key].owner.link + '">' + data.items[key].owner.display_name  + '</a> </p>  <p>Answer count:  ' + data.items[key].answer_count +' </p> </div><br>');
        } 
      $(questionItems.join('')).appendTo('.questionsContainer');
      questionItems = [];
      pollingData = false;
    }
  });
}

function getDistFromBottom () {  
  var scrollPosition = window.pageYOffset;
  var windowSize     = window.innerHeight;
  var bodyHeight     = document.body.offsetHeight;
  return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
}

document.addEventListener('scroll', function() {        
  distToBottom = getDistFromBottom();
  if (!pollingData && distToBottom > 0 && distToBottom <= 1111) {
    // console.log('Hitting the bottom of the page');
    pollingData = true;
    //pageNumber++;
    loadQuestions();
  }
});
loadQuestions();
});
