import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
//import { StackNavigator } from 'react-navigation'
import { purple, white } from '../utils/colors'
import { TextInput,Alert,KeyboardAvoidingView,ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { addDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { fetchDecks  } from '../actions';


function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Create Deck</Text>
    </TouchableOpacity>
  )
}

class NewDeck extends Component {

  submit = () => {
    const key = this.state.title
    const entry = this.state
    entry.key = key
    console.log(this.props.decks)
    let  filteredDeck = this.props.decks.filter((deck)=> deck.title === key);
    if (filteredDeck.length > 0)
    {
      Alert.alert(
         'A Deck with this title is already present'
      )
    }
    else
    {
       addDeck(key,entry)
       .then((decks) => this.props.dispatch(fetchDecks(decks)))
       .then(()=>{
           let  _deck = this.props.decks.filter((deck)=> deck.title === key)[0];
             this.props.navigation.navigate('DeckDetail',{..._deck});
       })
       .catch((e) =>{
         console.log(e);
         Alert.alert("An error has occurred")
       });

    //this.props.navigation.dispatch(NavigationActions.back({key:'NewDeck'}))
  }
  }

  toDeckList(){

    this.props.navigation.dispatch(NavigationActions.back({key:'NewDeck'}))
  }

  constructor(props) {
      super(props);
      this.state =  {
        key:"",
        title: "",
        questions:[],
      }

    }
  render() {
        return (
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView scrollEnabled={false} contentContainerStyle={styles.main}>
                <Text style ={styles.topDesription}> Add a Deck Title </Text>
                <TextInput style={styles.input}
                  onChangeText={(title) => this.setState({title})}  value={this.state.title} />
                <SubmitBtn onPress={this.submit} />
                </ScrollView>
            </KeyboardAvoidingView>
          )
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: white
  },

  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  topDesription: {
      marginTop: 20,
      textAlign: 'center',
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 20
   },
  input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
})
const mapStateToProps = (state) => {
  return {
      decks:state.deck,
  };
}
export default connect(
  mapStateToProps,
)(NewDeck)
