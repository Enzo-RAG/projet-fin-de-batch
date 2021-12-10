export default function(prenom = '', action) {
    if(action.type == 'saveprenom') {
        return action.prenom;
    } else {
        return prenom;
    }
}
   