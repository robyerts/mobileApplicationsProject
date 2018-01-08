import React,{Component} from 'react';
import { ActivityIndicator, TextInput, Alert, Button, TouchableOpacity, ListView, Text, View, AppRegistry, FlatList, StyleSheet, Picker} from 'react-native';
import {addAction} from '../Services/Actions/BasicActions';
import { MovieModel } from './InitScreen';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import { connect } from 'react-redux';

class AddMovieScreen extends Component{
	genre = 'DummyGenre';
	constructor(props){
		super(props);
		const {navigation} = this.props.navigation;
	}
	/*
		When we want to add a movie we send an addAction and then  navigate back to the home page
	*/
	addMovie(movie){
		this.props.addAction(movie);
		this.props.navigation.navigate('Home');
	}
	putGenre(genre){

	}
	render(){
		var movie = new MovieModel('DummyTitle','DummyDirector');
		console.log(this.props.navigation.state.params);
		return (
			<View>

			<Text>Title of the movie:</Text>
			<TextInput onChangeText={(text) => movie.title = {text}.text} style={styles.input} editable={true}/>

			<Text></Text>
			<Text>Edit director:</Text>
			<TextInput onChangeText={(text) => movie.director = {text}.text} style={styles.input} editable={true}/>
			<Picker
				selectedValue={this.genre}
				onValueChange={(itemValue, itemIndex) => this.genre = itemValue}>
				<Picker.Item label="Drama" value="Drama" />
				<Picker.Item label="Action" value="Action" />
				<Picker.Item label="Adventure" value="Adventure" />
				<Picker.Item label="Horror" value="Horror" />
			</Picker>
			<Button
              onPress={() => {this.addMovie(movie)}}
              title="Save"
            />
			<Button
				title="Show Dialog"
				onPress={() => {
					this.popupDialog.show();
				}}
			/>
			<PopupDialog
				dialogTitle={<DialogTitle title="Notice" />}
				ref={(popupDialog) => { this.popupDialog = popupDialog; }}
			>
				<View>
				<Text>If left blank, it will add a movie with the title DummyTitle and the director DummyDirector</Text>
				</View>
			</PopupDialog>
			</View>
		  )
	}
}

var styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor: 'slategrey'
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white'
    },
    activeTitle: {
      color: 'red',
    },
  });
  const mapState = (state = {}) => {
      return {...state};
  };
  
  const mapDispatch = (dispatch) => {
      return {
          addAction:(movie) => {
              dispatch(addAction(movie))
          }, 
      }
  };
  
export default connect(mapState, mapDispatch)(AddMovieScreen)