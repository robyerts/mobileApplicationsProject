import React from 'react';
import { ActivityIndicator, TextInput, Alert, Button, TouchableOpacity, ListView, Text, View, AppRegistry, FlatList, StyleSheet } from 'react-native';
import {email} from 'react-native-communications'
import { StackNavigator } from 'react-navigation';

export class App extends React.Component {
    render() {

        var movie1 = new Movie('johny bravo','Shawshank Redemption');
        var movie2 = new Movie('silvester','godfather');
        var movie3 = new Movie('silvester','godfather 2');
        var movie4 = new Movie('silvester','godfather 3');
        var movies = [];
        movies.push(movie1);
        movies.push(movie2);
        movies.push(movie3);
        movies.push(movie4);
        var moviesToBeRendered = [];
        const { navigate } = this.props.navigation;
        for(let i = 0; i < movies.length; i++){
            moviesToBeRendered.push(
                <View key = {i}>
                    <Button
                        onPress={() => navigate('Movie', {director: 'lolo', title: 'kuhkuh'})} //to-do: pass parameters with valid values
                        title={movies[i].state.title + '  By:' + movies[i].state.director}
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            )
        }
        return (
            <View>
                { moviesToBeRendered }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export class Movie extends React.Component{
    state = {director: 'buggydirector', title:'buggytitle'};

    constructor(director, title){
        super();

        this.state = {
            director: director.toString(),
            title: title.toString()};
        if (typeof title !== 'string'){
            this.state = {
                director: 'bad input',
                title: 'bad input'}
        }
    }

    render(){
        return (
            <View>
                <Text>{this.state.title}</Text>
                <Text>{this.state.director}</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('App')}
                    title="Go home"
                />
            </View>
        )
    }

}
export class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: ""
        }
    }

    loginButtonPressed(){
        Alert.alert("sending email..");
        email(['this.state.email'], null, null, "react-native mail test", "loged in at: " + new Date().toDateString());
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
                <TextInput onChangeText={(text) => this.setMail({text})} style={styles.input} />

                <Text>Password:</Text>
                <TextInput secureTextEntry={true} onChangeText={(text) => this.setPassword({text})} style={styles.input} />
                <Button onPress={() => this.loginButtonPressed()}
                        title="log in">
                    <Text style={styles.button}>Submit</Text>
                </Button>
                <Text></Text>
                <Button onPress={() => navigate('App')}
                        title="Go to app">
                    <Text style={styles.button}>Submit</Text>
                </Button>

            </View>
        );
    }
}
const RootNavigator = StackNavigator({
    Login: {
        screen: LoginComponent,
    },
    Movie: {
        screen: Movie,
    },
    App: {
        screen: App,
    }

});

export default RootNavigator;