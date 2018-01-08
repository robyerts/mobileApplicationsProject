import React from 'react';
import { ActivityIndicator, TextInput, Alert, Button, TouchableOpacity, ListView, Text, View, AppRegistry, FlatList, StyleSheet } from 'react-native';
import {email} from 'react-native-communications'
import { connect } from 'react-redux';
import {editAction, populateAction, logInAction} from '../Services/Actions/BasicActions';

class InitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.populateAction();
    }

	componentDidMount() {
	}
 
     loginButtonPressed(username, password){
		 this.props.logInAction(username, password);
        //email(['aslasldasdasd@asdasd.com'], null, null, "react-native mail test", "logged in at: " + new Date().toDateString());
     }

	initiate(){
		if	((this.props.basic.loggedAs == 'Client') || (this.props.basic.loggedAs == 'Admin')){
			const { navigate } = this.props.navigation;
			navigate('Home');
		}
		
	}
    render() {
		const { navigate } = this.props.navigation;
		var username;
		var password;
        return (
            <View style={styles.container}>
                <Text>Username:</Text>
                <TextInput onChangeText={ (text) => username = {text}.text} style={styles.input} />
 
                <Text>Password:</Text>
                <TextInput secureTextEntry={true} onChangeText={ (text) => password = {text}.text} style={styles.input} />
                <Button onPress={() => this.loginButtonPressed(username, password)}
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
          logInAction:(username, password) => {
              dispatch(logInAction(username,password))
          }, 
		  populateAction: () => {
			  dispatch(populateAction())
		  }
      }
  };
  
export default connect(mapState, mapDispatch)(InitScreen)
export class MovieModel{
	director = 'dummyArtist';
	title = 'dummyTitle';
	constructor(title, director){
		this.director = director;
		this.title = title;
	}
	
	setTitle(title){
		this.title = title;
		console.log(title);
	}
	setArtist(director){
		this.director = director;
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