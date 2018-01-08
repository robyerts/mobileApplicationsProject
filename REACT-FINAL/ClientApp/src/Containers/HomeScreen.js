import React,{Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { connect } from 'react-redux';
import {editAction} from '../Services/Actions/BasicActions';
import {deleteAction} from '../Services/Actions/BasicActions';
import { AsyncStorage } from 'react-native';

class HomeScreen extends Component{
    static navigationOptions = {
        title: 'Welcome',
    };
    
    constructor(){
        super();
    }

	delete(index){
		this.props.deleteAction(index);
		this.forceUpdate();
	}
	
	refresh(){
		this.forceUpdate();
	}

	render() {

	
	var viewText = [];
	console.log('State');
	console.log(this.props.basic);
	var movies = this.props.basic.movies.list;
	const { navigate } = this.props.navigation;
		for(let i = 0; i < movies.length; i++){

			viewText.push(
				<View key = {i} style={{flexDirection:'row', flexWrap:'wrap'}}>
					<Button
				onPress={() => { if (this.props.basic.loggedAs == 'Admin') this.props.navigation.navigate('Second', {index: i})}}
				title={movies[i].title + ' By: ' + movies[i].director}
				color="#6788bc"
				accessibilityLabel="Learn more about this purple button"
			/>
				{
					this.props.basic.loggedAs == 'Admin' &&
					<Button
					onPress={() => this.delete(movies[i]._id)}
					title='DEL'
					color="#48566d"
					accessibilityLabel="Learn more about this purple button"
					/>
				}
				</View>
			)
		}
	return (
			<View>
				<View>
				{ viewText }
				</View>
				<View>
					<Button
					onPress={() => this.props.navigation.navigate('AddMovie')}
					title='Add movie'
					color="#381788"
					accessibilityLabel="Learn more about this purple button"
				/>
					<Button
					onPress={() => this.refresh()}
					title='Refresh movies'
					color="#381788"
					accessibilityLabel="Learn more about this purple button"
				/>
				</View>
			</View>	
		)
  }
}

var styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems:'center',
      backgroundColor: 'white'
    },
    title: {
      marginTop:30,
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black'
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
          editAction:() => {
              dispatch(editAction())
          }, 
		  deleteAction: (index) => {
			  dispatch(deleteAction(index))
		  }
      }
  };
  
export default connect(mapState, mapDispatch)(HomeScreen)
  