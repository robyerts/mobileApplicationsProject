import React from 'react';
import { ActivityIndicator, TextInput, Alert, Button, TouchableOpacity, ListView, Text, View, AppRegistry, FlatList, StyleSheet } from 'react-native';
import {email} from 'react-native-communications'
import { StackNavigator } from 'react-navigation';

export class MovieListComponent extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        var viewText = [];
        var movies = this.props.navigation.state.params.movies;
        const { navigate } = this.props.navigation;
        for(let i = 0; i < movies.length; i++){

            viewText.push(
                <View key = {i}>
                    <Button
                        onPress={() => this.props.navigation.navigate('MovieDetails', {movies: movies, index: i})}
                        title={movies[i].title + ' By: ' + movies[i].director}
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            );
        }
        return (
            <View>
                { viewText }
            </View>
        )
    }

    setMail(text){

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },inputBox: {
        width: 100
    }
});

export class Movie{
    director = '';
    title = '';
    constructor(title, director){
        this.director = director;
        this.title = title;
    }

    setTitle(title){
        this.title = title;
    }
    setDirector(director){
        this.director = director;
    }
}

export class MovieDetailsComponent extends React.Component{
    state = new Movie('','');

    constructor(props){
        super(props);
        const navigation = this.props.navigation;
    }

    render(){
        var movies = this.props.navigation.state.params.movies;
        var index = this.props.navigation.state.params.index;
        state = movies[index];
        return (
            <View>
                <Text>{state.title}</Text>
                <Text>Edit title:</Text>
                <TextInput onChangeText={(text) => state.setTitle({text}.text)} editable={true} defaultValue={state.title}/>
                <Text></Text>
                <Text>{state.director}</Text>
                <Text>Edit director:</Text>
                <TextInput onChangeText={(text) => state.setDirector({text}.text)} editable={true} defaultValue={state.director}/>

                {/*<Button*/}
                    {/*onPress={() => this.props.navigation.navigate('MovieListComponent', {movies: movies})}*/}
                    {/*title="Go home"*/}
                {/*/>*/}
            </View>
        )
    }

}
export class MainComponent extends React.Component {
    movies = [];
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: ""
        };
        var movie1 = new Movie('Children of men','Alfonso Cuarón');
        var movie2 = new Movie('Requiem for a Dream','Darren Aronofsky');
        var movie3 = new Movie('The Fountain','Darren Aronofsky');
        var movie4 = new Movie('In Time','Andrew Niccol');
        this.movies.push(movie1);
        this.movies.push(movie2);
        this.movies.push(movie3);
        this.movies.push(movie4);
    }

    loginButtonPressed(){
        Alert.alert("sending email..");
        email([this.state.mail], null, null, "react-native mail test", "Captured password: " + this.state.password.toString()  + "\n logged in at: " + new Date().toISOString());
    }
    setMail(text){
        this.state.mail = text;
    }
    setPassword(text){
        this.state.password= text;
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Email:</Text>
                <TextInput style={styles.inputBox} onChangeText={(text) => this.setMail({text})}/>

                <Text>Password:</Text>
                <TextInput secureTextEntry={true} style={styles.inputBox} onChangeText={(text) => this.setPassword({text})}  />
                <Button onPress={() => this.loginButtonPressed()}
                        title="log in">
                    <Text>Submit</Text>
                </Button>
                <Text></Text>
                <Button onPress={() => navigate('MovieList', {movies: this.movies})}
                        title="list of movies">
                    <Text>Submit</Text>
                </Button>

            </View>
        );
    }
}
const RootNavigator = StackNavigator({
    App: {
        screen: MainComponent,
    },
    MovieDetails: {
        screen: MovieDetailsComponent,
    },
    MovieList: {
        screen: MovieListComponent,
    }

});

export default RootNavigator;