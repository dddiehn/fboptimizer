// http://stackoverflow.com/questions/10655202/detect-multiple-keys-on-single-keypress-event-in-jquery/10655316#10655316
var down = [];
$(document).keydown(function(e) {
    down[e.keyCode] = true;
}).keyup(function(e) {
    // 13 is enter
    // 17 is ctrl
    if (down[17] && down[13]) {
      count = 0;

      // these ones work:
      count += $('[role="article"] a:contains("ClickHole")').length;
      $('a:contains("ClickHole")').closest("[role='article']").remove();
      // well...I thought these were working:
      $('span._m8d:contains("Suggested Post")');

      // these ones don't work:
      $('span:contains("Birthday")').closest('._4ikz');
      console.log(count + ' things BAHLEETED');
    }
    down[e.keyCode] = false;
});
