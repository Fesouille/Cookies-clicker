var score =0;
var cookieperclick = 1;

(function() {

function addcookie(score){
    score = score + cookieperclick;
    displayscore(score);
}
    setInterval(function(){ 
        displayscore(score); 
        console.log( "hello" )
    }, 10);
    
    function displayscore(){
        document.getElementsByClassName("affichage")[0].setAttribute("value", score);
        document.getElementsByClassName("affichage")[0].innerHTML = "here your cookies : " + score;
    };
    
    document.getElementById("click").addEventListener("click", function(){
        addcookie(score);
    });


}());





