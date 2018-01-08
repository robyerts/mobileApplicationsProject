/*
	Define the actions to be used by the application (type and parameters)
*/
export function logInAction(username, password){  
    return {
        type:'LOGIN',
        username,
		password
    }
}
export function editAction(title,director, id){
    return {
        type:'EDIT',
        title,
		director,
		id
    }
}
export function addAction(movie){
	console.log(movie);
    return {
        type:'ADD',
        movie
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
	//console.log(movies);
    return {
        type:'POPULATE',
        //movies
    }
}