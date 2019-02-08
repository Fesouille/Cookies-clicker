
/* Partie de Ted */
var score = 0;
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
    
    document.getElementById("click").addEventListener("click", function(){
        addcookie(score);
    });
      
/* Partie de JM */
var multiplicateur = 1;
var mult_price = 10;

(function (){

    function augmenterMultiplicateur (){
        multiplicateur = multiplicateur + 1;
    };

    function make_price(price){
        return price*2;
    };
    
        document.getElementById("multiplier").addEventListener("click", function(){
        
            if (score >= mult_price){
                augmenterMultiplicateur(multiplicateur);
                document.getElementById("multiplier").innerHTML = "Multiplicateur x"+ (multiplicateur+1);
                cookieperclick = cookieperclick * multiplicateur;
                score = score - mult_price;
                mult_price = make_price(mult_price);
                console.log(multiplicateur, cookieperclick, score, mult_price);
            };
        })

}());

