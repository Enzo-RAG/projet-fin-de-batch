export default function(commandes = [], action) {

    if(action.type=='addToCommandes' && !commandes.includes(action.commande)) {
        var copyCommandes = [... commandes]
        copyCommandes.push(action.commande)
        console.log("from reducer - addToCommande :", action.commande)
       return copyCommandes
    }else{
        return commandes;
    }
}

