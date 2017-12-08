import { StackNavigator } from 'react-navigation';
import HomeScreen from './Containers/HomeScreen';
import SecondScreen from './Containers/SecondScreen';
import InitScreen from './Containers/InitScreen';
import AddMovieScreen from './Containers/AddMovieScreen';
//Create the routes of the application

export default RouterComponent = StackNavigator({
	Init: { screen: InitScreen },
    Home: { screen: HomeScreen },
    Second: { screen: SecondScreen },
	AddMovie: { screen: AddMovieScreen }
});

  