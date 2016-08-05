$( document ).ready(function() {

$.ajax({
  type: 'GET',
  url: "https://api.stackexchange.com/2.2/questions?page=1&order=desc&sort=creation&site=stackoverflow",
  dataType: 'json',
  cache: false,
  success: function(data){
  	console.log(data);
  	// data = stackOverResponse;
  	var questionItems = [];
      for(var key in data.items) {
        console.log(data.items[key].title); 
        var questionTitle = data.items[key].title;
        questionItems.push('<div class="questionCard"> <h2>' + data.items[key].title + '</h2>  <p> ' + data.items[key].owner.display_name  + ' </p>  <p>Answer count:  ' + data.items[key].answer_count +' </p> </div><br>');
      } 
     $(questionItems.join('')).appendTo('.questionsContainer');
  }
});

});


