export default function(id = '', action) {
    if(action.type == 'saveId') {
        console.log('testreducerererererererer', action.id)
        return action.id;
    } else {
        return id;
    }
}