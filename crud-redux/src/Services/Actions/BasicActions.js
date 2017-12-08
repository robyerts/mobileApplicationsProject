/*
	Define the actions to be used by the application (type and parameters)
*/
export function editAction(title,director, id){
    return {
        type:'DEFAULT',
        title,
		director,
		id
    }
}
export function addAction(song){  
	console.log(song);
    return {
        type:'ADD',
        song
    }
}
export function deleteAction(index){  
	console.log(index);
    return {
        type:'DELETE',
        index
    }
}
export function populateAction(){  
    return {
        type:'POPULATE',
    }
}