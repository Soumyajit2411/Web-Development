var randomNumber1=Math.floor(Math.random()*6);
var image="images/dice"+randomNumber1+".png";
document.querySelectorAll("img")[0].setAttribute("src",image);

var randomNumber2=Math.floor(Math.random()*6);
var images="images/dice"+randomNumber2+".png";
document.querySelectorAll("img")[1].setAttribute("src",images);

if(randomNumber1>randomNumber2){
    document.querySelector("h1").innerHTML="Play 1 Wins";
}
else if(randomNumber2>randomNumber1){
    document.querySelector("h1").innerHTML="Play 2 Wins";
}
else{
    document.querySelector("h1").innerHTML="Draw!";
}