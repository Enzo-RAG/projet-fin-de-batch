export default function(id = '10', action) {
    if(action.type == 'saveId') {
        console.log('testreducerererererererer******************************************', action.id)
        return action.id;
    } else {
        console.log('testreducerererererererer********', id)
        return id;
    }
}