// https://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

// http://stackoverflow.com/questions/20849496/using-facebook-sdk-with-chrome-extensions

// http://stackoverflow.com/questions/10655202/detect-multiple-keys-on-single-keypress-event-in-jquery/10655316#10655316
window.fbAsyncInit = function() {
    FB.init({
      appId      : 'your-app-id',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

var down = [];
$(document).keydown(function(e) {
    down[e.keyCode] = true;
}).keyup(function(e) {
    // 13 is enter
    // 17 is ctrl
    if (down[17] && down[13]) {
      count = 0;

      // leaving out count information till I think of a cleaner way to do it
      // count += $('[role="article"] a:contains("ClickHole")').length;

      // these ones work:
      // bads stores every string that you don't wanna see in a post
      var bads = ["#", "memes", "trump"];
      for (var i = 0; i < bads.length; i++) {
        deleteSelector = ":contains(\"" + bads[i] + "\")";
        $("[role='article']" + deleteSelector).remove();
        // $('p' + deleteSelector).closest("[role='article']").remove();
        // $('a' + deleteSelector).closest("[role='article']").remove();
      }
      $('span:contains("\'s Birthday")').closest('._4ikz').remove();
      $('span._m8d:contains("Suggested Post")').closest("[role='article']").remove();

      // chrome.storage.sync.set({'value': theValue}, function() {
      //     // Notify that we saved.
      //     message('Settings saved');
      //   });

      // ***************************************************************************************
      // these ones don't work:


      // special fancy informations
      console.log('BAHLEETED');
    }
    down[e.keyCode] = false;
});
