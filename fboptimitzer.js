// https://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
// http://stackoverflow.com/questions/2012299/contain-start-by
$.extend($.expr[":"], {
  "startsWith": function(elem, i, match, array) {
    return (elem.textContent || elem.innerText || "").toLowerCase ().indexOf((match[3] || "").toLowerCase()) == 0;
  }
});

function deleteCount(){
  return $("[role='article']:hidden").length;
}

function deleteEm(){
  count = 0;

  // these ones work:
  // bads stores every string that you don't wanna see in a post
  var politics  = ["trump", "democrat", "republican", "democratic", "republican", "libertarian", "green party", "right wing", "left wing", "liberal", "conservative", "socialism", "capitalism", "socialist", "capitalist"];
  var clickbait = ["you won't believe", "faith in humanity", "one weird trick", "buzzfeed", "get your tissues ready"];
  var lame      = ["meme", "birthday", "trash dove", "that moment", "awkward moment", "my face", "my reaction", "in a relationship", "recipe", "am i the only one that", "viral", "me:", "smash mouth", "mondays", "leaving work on a friday", "asf", "as f", "af", "squad goals", "relationship goals", "fleek", "like if", "share if", "blowing up", "break the internet", "broke the internet", "tag", "me", "pokemon", "tag", "lit", "fire", "bae", "when you"];
  var ads       = ["suggested page", "tour date", "sponsered"];
  var sports    = ["football", "nfl", "basketball", "baseball", "nhl", "hockey", "nba"];
  var spoilers  = ["spoiler", "game of thrones", "harry potter", "star wars", "breaking bad"];
  var cars      = ["car", "truck", "ford", "chevy", "chevorlet", "jeep", "engine", "diesel"]

  // wow js is lame. should be able to do ['a'] + ['b'] to evaluate to ['a', 'b']
  // yes, I'm gonna be doing some conditionalizing when I get the config stuff working
  var bads = politics.concat(clickbait.concat(lame.concat(ads.concat(sports.concat(spoilers.concat(cars))))));
  var deleteSelector = ""
  for (var i = 0; i < bads.length; i++) {
    console.log(bads[i]);
    // we should figure out a way so that words like "cat" don't hide words like "category"
    // right now I'm just including a space before and after the "bad words"
    // this won't hide posts that contain "bad words" at the end or beginning of the post
    // I've now added the startsWith function to jQuery, I think we can do the same with endsWith

    // sloppy way of 'pluralizing' words. it's not gonna work 100%
    // https://api.jquery.com/attribute-starts-with-selector/


    // contains
    singularDeletes   = "[role='article']:contains(\" " + bads[i] + " \") "
    pluralDeletes     = "[role='article']:contains(\" " + bads[i] + "s \") "
    possesiveDeletes  = "[role='article']:contains(\" " + bads[i] + "'s \") "
    pluralDeletees    = "[role='article']:contains(\" " + bads[i] + "es \") "

    // startsWith
    singularDeletes  += "[role='article']:startsWith(\"" + bads[i] + " \") "
    pluralDeletes    += "[role='article']:startsWith(\"" + bads[i] + "s \") "
    possesiveDeletes += "[role='article']:startsWith(\"" + bads[i] + "'s \") "
    pluralDeletees   += "[role='article']:startsWith(\"" + bads[i] + "es \") "

    // endsWith
    // singularDeletes  += "[role='article']:endsWith(\"" + bads[i] + " \") "
    // possesiveDeletes += "[role='article']:endsWith(\"" + bads[i] + "'s \") "
    // pluralDeletes    += "[role='article']:endsWith(\"" + bads[i] + "s \") "
    // pluralDeletees   += "[role='article']:endsWith(\"" + bads[i] + "es \") "

    // combine all collections for one 'clean' one
    deleteSelector = deleteSelector + singularDeletes + pluralDeletes + pluralDeletees + possesiveDeletes

  }
  $(deleteSelector).closest('._4ikz').hide();

  $('span:contains("\'s Birthday")').closest('._4ikz').hide();
  $('span._m8d:contains("Suggested Post")').closest("[role='article']").hide();

  console.log('BAHLEETED ' + deleteCount() + ' sucky posts');

}

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

function updateFilter(name, value){
  filter = {name: value}
  chrome.storage.sync.set({"filter": filter}, function() {
      console.log("name: " + name);
      console.log("value: " + value);
  });
}

function getFilters(){
  console.log("getting filters");
  console.log(chrome.storage.sync.get("filter"))
}

// ********************************************************************************************************************
// mainish area:
//



// http://stackoverflow.com/questions/20764517/execute-script-after-click-in-popup-html-chrome-extension
// for click events in the popup

// updateFilter("politics",  ["trump", "democrat", "republican", "right wing", "left wing", "liberal", "conservative"]);
// updateFilter("clickbait", ["you won't believe", "faith in humanity", "one weird trick", "buzzfeed", "get your tissues ready", "here's why", "here's how"]);
// updateFilter("lame",      ["meme", "birthday", "trash dove", "that moment", "awkward moment", "my face", "my reaction", "in a relationship", "recipe", "am i the only one that", "viral", "me:", "smash mouth", "mondays", "leaving work on a friday", "asf", "squad goals", "relationship goals", "fleek", "like if", "share if"]);
// updateFilter("ads",       ["suggested page", "tour date", "sponsered"]);
// updateFilter("sports",    ["football", "nfl", "basketball", "baseball", "nhl", "hockey", "nba"]);
// updateFilter("spoilers",  ["spoiler", "game of thrones", "harry potter", "star wars", "breaking bad"]);
//
// getFilters();

deleteEm();

articleCount = $("._4ikz [role='article']").length
setInterval(function(){
  console.log("Checking to see if any lameness has been spawned...");
  newArticleCount = $("._4ikz [role='article']").length
  if(newArticleCount > articleCount){
    deleteEm();
    articleCount = newArticleCount
  }else{
    console.log("It looks clear. (" + deleteCount() + " so far)");
  }
}, 5000);

$('body').on('click', '#fbo-form', function() {
  alert("test")
});


// chrome.storage.sync.set({'value': theValue}, function() {
//     // Notify that we saved.
//     message('Settings saved');
//   });
