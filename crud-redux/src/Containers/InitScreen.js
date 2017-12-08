import React from 'react';
import { ActivityIndicator, TextInput, Alert, Button, TouchableOpacity, ListView, Text, View, AppRegistry, FlatList, StyleSheet } from 'react-native';
import {email} from 'react-native-communications'
import { connect } from 'react-redux';
import {editAction, populateAction} from '../Services/Actions/BasicActions';

 class InitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: ""
        }
		
    }
    loginButtonPressed(){
        Alert.alert("sending email..");
        email([this.state.email], null, null, "react-native mail test", "logged in at: " + new Date().toDateString());
    }
    setMail(text){
         this.state.mail = text;
    }
    setPassword(text){
        this.state.password= text;
    }
	initiate(){
		this.props.populateAction();
		const { navigate } = this.props.navigation;
		navigate('Home');
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
				<Button onPress={() => this.initiate()}
                        title="Go to app">
                    <Text style={styles.button}>Submit</Text>
                </Button>
 
            </View>
        );
    }
}
const mapState = (state = {}) => {
      return {...state};
  };
  
  const mapDispatch = (dispatch) => {
      return {
          editAction:(text) => {
              dispatch(editAction(text))
          }, 
		  populateAction: () => {
			  dispatch(populateAction())
		  }
      }
  };
  
export default connect(mapState, mapDispatch)(InitScreen)

export class MovieModel{
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

export class MovieList{
	list = [];
	constructor(){
	}
	push( movie ){
		this.list.push(movie);
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