export default function(basket = [], action) {

    if(action.type=='addToBasket') {
        if(!basket.find(element => element.name == action.objMedoc.name)){              // 1 - On regarde si l'element à ajouter au panier est absent du panier
            var newObject = Object.assign(action.objMedoc,{quantity:1})                 // 2 - On crée un nouvel objet où on ajoute la paire clé/valeur => quantité : number à l'objet transitant par l'action
            var copyBasket = [...basket,newObject]                                      // 3 - On crée une copie tu tableau Basket où on ajoute le nouvel objet
        }else{ 
            var copyBasket = [...basket]                                                // 1 - on crée une copie du panier
            for(var i=0;i<copyBasket.length;i++){                                       // 2 - On boucle sur la copie du panier
                if(copyBasket[i].name === action.objMedoc.name){                        // 3 - On regarde si on trouve une concordance entre l'element courant et ce qui transite par l'action.
                  copyBasket[i].quantity++  
                  break
                }
            }
        }
        console.log(copyBasket)
        return copyBasket
    }else if(action.type=='deleteOne'){
        var copyBasket = [...basket]                                       
        for(var i=0;i<copyBasket.length;i++){                         
            if(copyBasket[i].name === action.objMedoc.name){                        
                if(copyBasket[i].quantity>=2){
                    copyBasket[i].quantity--
                }else{
                    if (copyBasket[i].quantity>0){copyBasket[i].quantity--}
                    copyBasket = copyBasket.filter(objet => objet.name !== action.objMedoc.name );
                } 
              break
            }
        }
        console.log(copyBasket)
        return copyBasket
    }else {
        return basket;
    }
}

