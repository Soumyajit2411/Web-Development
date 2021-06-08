$(document).ready(function () {
  $("h1").css("color", "red");
  $("h1").addClass("big-title");
  console.log($("h1").css("color"));
  $("button").text("Bye");
  $("button").html("<em>Press</em>");
  console.log($("a").attr("href", "https://www.google.com/"));
});
$("h1").click(function () {
  $("h1").css("color", "purple");
});
$("button").click(function () {
  $("h1").css("color", "purple");
});
$("input").keydown(function (event) {
  $("h1").text(event.key);
});
$("h1").on("mouseover", function () {
  $("h1").css("color", "green");
});
$("button").on("click", function () {
  $("h1").hide().show().fadeOut();
  $("h1").fadeToggle();
  $("h1").slideToggle();
  $("h1").animate({ opacity: 0.5 });
});
