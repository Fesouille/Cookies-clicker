
/* Partie de Ted */
var score = 0;
var cookieperclick = 1;
var multiplicateur = 1;
var mult_price = 10;

(function() {

    function addcookie(){
        score = score + cookieperclick;
        displayscore(score);
    };
    
    setInterval(function(){ 
        displayscore(score); 
        console.log( "hello" )
    }, 10);
    
    function displayscore(){
        document.getElementsByClassName("affichage")[0].setAttribute("value", score);
        document.getElementsByClassName("affichage")[0].innerHTML = "here your cookies : " + score;
    };
    
    document.getElementById("click").addEventListener("click", function(){
        addcookie();
        console.log(score);
    });
      
/* Partie de JM */


    function augmenterMultiplicateur (){
        multiplicateur = multiplicateur + 1;
    };

    function make_price(price){
        return price*2;
    };
    
    document.getElementById("multiplier").innerHTML = "Multiplier x"+ multiplicateur + " Price: " + mult_price;

    document.getElementById("multiplier").addEventListener("click", function(){
        
            if (score >= mult_price){
                cookieperclick = cookieperclick + multiplicateur;
                augmenterMultiplicateur(multiplicateur);
                document.getElementById("multiplier").innerHTML = "Multiplier x"+ multiplicateur + " Price: " + make_price(mult_price);
                score = score - mult_price;
                mult_price = make_price(mult_price);
                console.log(multiplicateur, cookieperclick, score, mult_price);
            };
        });

}());

