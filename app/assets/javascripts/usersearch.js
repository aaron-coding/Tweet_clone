$.UsersSearch = function(el) {
  this.$el = $(el);
  this.$ul = this.$el.find("ul.users")
  
  this.$input = this.$el.find("#search-box");
  this.$input.on("keyup", this.handleInput.bind(this));
}

$.UsersSearch.prototype.handleInput = function(event){
  var queryString = this.$input.val();
  var that = this;
  // var c = String.fromCharCode(event.which);
  
  $.ajax ({
    type: 'GET',
    url: '/users/search',
    dataType: 'json',
    data: { query: queryString },
    success: function(resp){
      that.renderResults(resp);
    }
  });
}

// <button data-followee-id="<%=user.id%>"
//   data-user-id="<%= current_user.id%>"
//   <% if current_user.follows?(user) %>
//     data-initial-follow-state="followed"
//   <% else %>
//     data-initial-follow-state="unfollowed"
//   <% end %>
//   class="follow-toggle">
// </button>


$.UsersSearch.prototype.renderResults = function(users){
  this.$ul.html("");
  for (var i = 0; i < users.length; i++) {
    
    if(users[i].followed){
      var followState = true;
    } else {
      var followState = false;
    }
   
    var options = {
    // 'userId':  ,
    'followeeId': users[i].id,
    'followState': followState,
    
   }
    var followee = users[i].id;
    
    var button = $("<button></button>");
    var userUrl = "/users/" + users[i].id;
    var liString = "<li><a href="+ userUrl +">" + users[i].username + "</a></li>";
    this.$ul.append(liString);
  }
};

$.fn.usersSearch = function() {
  return this.each(function () {
    new $.UsersSearch(this);
  });
}

$(function () {
  $(".users-search").usersSearch();
});