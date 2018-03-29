var tweet;

$(document).ready(getQuote);
$(RandomQuoteMachine);

function RandomQuoteMachine() {
  $("#getQuote").on("click", getQuote);
}

function getQuote() {
  var quote;
  var author;

  $.getJSON("https://talaikis.com/api/quotes/random/", function(json) {
    $("#quote").text(json.quote);
    $("#author").text(json.author);
    quote = json.quote;
    //    console.log(quote, "quote");
    author = json.author;
    //   console.log(author, "author");
    var maxLength = 140 - author.length - 7;
    /*console.log(maxLength, "maxLength");*/
    if (json.quote.length + json.author.length > maxLength) {
      tweet = quote.substring(0, maxLength) + " ... - " + author;
      console.log(tweet, "tweet");
    } else {
      tweet = `${quote} - ${author}`;
    }

    // debug: this work */
    /* console.log(json.author, "json.author"); // debug:  this work */
  });

  /*   $.ajax({
      url: "https://talaikis.com/api/quotes/random/",
      cache: false,
      success: function(json) {
        $("#cat").text(json.cat);
      }
    }); */
}

$("#tweet").on("click", function() {
  //console.log(tweet, "tweet2");
  window.open("https://twitter.com/intent/tweet?text=" + tweet);
});
