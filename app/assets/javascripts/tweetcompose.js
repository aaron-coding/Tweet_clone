$.TweetCompose = function (el, options) {
  this.$el = $(el);
  this.$ul = $('.feed');
  this.$el.on("submit", this.handleSubmit.bind(this) )
};



$.TweetCompose.prototype.handleSubmit = function(event){
   event.preventDefault();
   var that = this;
   var formData = this.$el.serializeJSON();
   $.ajax ({
     url: "/tweets",
     type: "POST",
     data: {'tweet': formData['tweet']},
     dataType: 'json',
     success: function(resp){
       that.renderResult(resp);
     }
   })
}

$.TweetCompose.prototype.renderResult = function(tweet){

  var content = tweet.content;
  var author = tweet.user.username;
  var linkUrl = "<a href='/user/" + tweet.user_id + "'>" + author + "</a>";
  var createdAt = tweet.created_at;
  debugger
  var mentions = tweet.mentions;
  var mentionsString = "<ul>";

  for (var i = 0; i < mentions.length; i++) {
    var mentionUserId = mentions[i].user.id;
    var mentionUsername = mentions[i].user.username;
    mentionsString += "<li><a href='/user/" + mentionUserId + "'>" + mentionUsername + "</a></li>";
  }
  mentionsString += "</ul>"

  var tweetString = "<li>" + content + " -- "+ linkUrl + " -- " + createdAt + mentionsString + "</li>"
  this.$ul.prepend(tweetString)

}

$.fn.tweetCompose = function (options) {
  return this.each(function () {
    new $.TweetCompose(this, options);
  });
};


$(function () {
  $(".tweet-compose").tweetCompose();
});

