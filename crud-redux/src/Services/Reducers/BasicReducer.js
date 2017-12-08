import { AsyncStorage } from 'react-native';
/*
	Create a reducer that deals with the actions
	initial list of movies
*/
	
const basicReducer = (state={
    movies: {
		list: [
			{
				title : 'movie1',
				director : 'director1'
			},
            {
                title : 'movie2',
                director : 'director2'
            },
            {
                title : 'movie3',
                director : 'director3'
            }
		]
	}
}, action) => {
    switch(action.type){
		//Deal with each action type
        case 'DEFAULT':
			var title = action.title;
			var director = action.director;
			var index = action.id;

            var movies =  cloneObject(state.movies) //clone the current state
			if (index !== -1) {
                movies.list[index].title = title;
				movies.list[index].director = director;

            }
            state = Object.assign({}, state, { movies: movies});
        break;
		case 'POPULATE':
			return state;
		break;
		case 'ADD':
			var song = action.song;
            var songs =  cloneObject(state.movies) //clone the current state
            songs.list.push(song);
			//AsyncStorage.setItem('movies', movies.list);
            state = Object.assign({}, state, { movies: songs});
        break;
		case 'DELETE':
			var index = action.index;

            var songs =  cloneObject(state.movies) //clone the current state
            songs.list.splice(index, 1);
            state = Object.assign({}, state, { movies: songs});
        break;
    }
    return state;
};
function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}
export class MovieList{
	list = [];
	constructor(){
		
	}
	push( movie ){
		this.list.push(movie);
	}
}
export default basicReducer;

