$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.followeeId = this.$el.data("followee-id") || options.followeeId;
  this.followState = this.$el.data("initial-follow-state") || options.followState;
  this.render();
  this.$el.on("click", this.handleClick.bind(this));
};

$.FollowToggle.prototype.render = function () {
  
  if (this.followState === "following" || this.followState === "unfollowing") {
    this.$el.prop("disabled", true);
  } else {
     this.$el.prop("disabled", false);
  }
  
  if (this.followState === "followed"){
    var buttonText = "Unfollow!";
  } else {
    var buttonText = "Follow!";
  }
   
  this.$el.html(buttonText);
};

$.FollowToggle.prototype.handleClick = function(event){
  event.preventDefault();
  var that = this;
  var urlString = '/users/' + this.followeeId + '/follow';

  if (this.followState === "followed") {
    this.followState = "unfollowing";
    this.render();
    $.ajax ({
      type: 'DELETE',
      url:  urlString,
      dataType: 'json',
      success: function (){
        that.followState = "unfollowed"
        that.render(); 
      }
    });
  } else {
    this.followState = "following";
    this.render();
    $.ajax ({
      type: 'POST',
      url: urlString,
      dataType: 'json',
      success: function (){
        that.followState = "followed"
        that.render(); 
      }
    });
  }
}

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});