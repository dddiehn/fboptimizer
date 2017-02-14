// $(document).keypress(function(e) {
//   if(e.which == 13) {
//
//   }
// });

// http://stackoverflow.com/questions/10655202/detect-multiple-keys-on-single-keypress-event-in-jquery/10655316#10655316
var down = [];
$(document).keydown(function(e) {
    down[e.keyCode] = true;
}).keyup(function(e) {
    if (down[17] && down[13]) {
      console.log('Enter was pressed');
      // $('._4ikz').remove()
      $('a:contains("ClickHole")').closest("[role='article']").remove();
      $('span:contains("Birthday")').closest('._4ikz');
    }
    down[e.keyCode] = false;
});
