export default function(pseudo = '', action) {
    if(action.type == 'savePseudo') {
        console.log('testreducerererererererer', action.pseudo)
        return action.pseudo;
    } else {
        return pseudo;
    }
}