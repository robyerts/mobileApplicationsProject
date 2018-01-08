import { AsyncStorage } from 'react-native';
/*
	Create a reducer that deals with the actions
	It also creates an initial state with one movie in it
*/

const basicReducer = (state={movies:
	{
		list: []
	}}, action) => {
    switch(action.type){
		//Deal with each action type
        case 'EDIT':
			var id = action.id;
			var url = 'http://192.168.0.105:3000/api/movies';
			var fin = url + '/' + id;
			var details = {
				'title': action.title,
				'director': action.director
			};
			data = encodeForm(details);

			fetch(fin, {
				method: 'PUT',
				headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/x-www-form-urlencoded'
							},
				body: data
			});
			updateMovieList(state);
        	break;

		case 'POPULATE':
			updateMovieList(state);
			break;

		case 'ADD':
			var movie = action.movie;
			var details = {
				'title': movie.title,
				'director': movie.director
			};
			data = encodeForm(details);

			fetch('http://192.168.0.105:3000/api/movies', {
				method: 'POST',
				headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/x-www-form-urlencoded'
							},
				body: data
			});
			updateMovieList(state);
        	break;

		case 'DELETE':
			var index = action.index;
			console.log('Del');
			console.log(index);
			var url = 'http://192.168.0.105:3000/api/movies';
			console.log(url);
			var fin = url + '/' + index;
			console.log(fin);
			fetch(fin, {
				method: 'DELETE',
				headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/x-www-form-urlencoded'
							}
			});
			updateMovieList(state);

        break;
		case 'LOGIN':
			var user = action.username;
			var pass = action.password;
			var details = {
				'username': action.username,
				'password': action.password
			};
			data = encodeForm(details);
			fetch('http://192.168.0.105:3000/api/user', {
				method: 'POST',
				headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/x-www-form-urlencoded'
							},
				body: data
			}).then((response) => {console.log(response._bodyText); state.loggedAs = response._bodyText})
			  .catch( function(error){
					console.log(error);
				});
    }
    return state;
};
//Function used when needed to create a copy of the state
function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function encodeForm(details){
	var formBody = [];
	for (var property in details) {
		var encodedKey = encodeURIComponent(property);
		var encodedValue = encodeURIComponent(details[property]);
		formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");
	return formBody;
}
function updateMovieList(state){
	AsyncStorage.getItem('stateOff').then((data) => {
		state.movies.list = JSON.parse(data);
	});
	console.log('Aaa');
	console.log(state);
	fetch('http://192.168.0.105:3000/api/movies')
		.then((response) => response.json())
		.then((responseData) => {
			state.movies.list = JSON.parse(JSON.stringify(responseData));
			AsyncStorage.setItem('stateOff', JSON.stringify(responseData));
		})
		.catch( function(error){
				console.log(error);
			});

}
export default basicReducer;
