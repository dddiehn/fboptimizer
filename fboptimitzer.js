// https://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

function deleteEm(){
  count = 0;

  // these ones work:
  // bads stores every string that you don't wanna see in a post
  var politics = ["trump", "democrat", "republican", "right wing", "left wing", "liberal", "conservative"];
  var clickbait = ["you won't believe", "faith in humanity", "one weird trick"];
  var lame = ["meme", "birthday", "trash dove", "that moment", "awkward moment", "my face", "my reaction", "in a relationship", "recipe", "am i the only one that", "viral", "me:", "smash mouth"];
  var ads = ["suggested page", "tour date", "sponsered"];
  var sports = ["football", "nfl", "basketball", "baseball", "nhl", "hockey", "nba"]

  // wow js is lame. should be able to do ['a'] + ['b'] to evaluate to ['a', 'b']
  // yes, I'm gonna be doing some conditionalizing when I get the config stuff working
  var bads = politics.concat(clickbait.concat(lame.concat(ads.concat(sports))));
  for (var i = 0; i < bads.length; i++) {
    console.log(bads[i]);
    // we should figure out a way so that words like "cat" don't hide words like "category"
    // right now I'm just including a space before and after the "bad words"
    // this won't hide posts that contain "bad words" at the end or beginning of the post
    $("[role='article']:contains(\" " + bads[i] + " \")").closest('._4ikz').hide();
    // sloppy way of 'pluralizing' words. it's not gonna work 100%
    $("[role='article']:contains(\" " + bads[i] + "s \")").closest('._4ikz').hide();
    $("[role='article']:contains(\" " + bads[i] + "es \")").closest('._4ikz').hide();
  }
  $('span:contains("\'s Birthday")').closest('._4ikz').hide();
  $('span._m8d:contains("Suggested Post")').closest("[role='article']").hide();

  var deletedCount = $("[role='article']:hidden").length;
  console.log('BAHLEETED ' + deletedCount + ' sucky posts');
}

// http://stackoverflow.com/questions/20849496/using-facebook-sdk-with-chrome-extensions
// I'm not doing anything with this yet
window.fbAsyncInit = function() {
    FB.init({
      appId      : 'your-app-id',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

// http://stackoverflow.com/questions/10655202/detect-multiple-keys-on-single-keypress-event-in-jquery/10655316#10655316
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

      deleteEm();

    }
    down[e.keyCode] = false;
});

$("[id^=topnews_main_stream_]").on("change", function(){
  console.log("taco bell");
});

deleteEm();

articleCount = $("._4ikz [role='article']").length
setInterval(function(){
  console.log("Checking to see if any lameness has been spawned...");
  newArticleCount = $("._4ikz [role='article']").length
  if(newArticleCount > articleCount){
    deleteEm();
    articleCount = newArticleCount
  }else{
    console.log("It looks clear.");
  }
}, 10000);


// chrome.storage.sync.set({'value': theValue}, function() {
//     // Notify that we saved.
//     message('Settings saved');
//   });
