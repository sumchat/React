  import React, { Component } from 'react'
  import { View, TouchableOpacity, Text, StyleSheet, Platform} from 'react-native'
  import { StackNavigator } from 'react-navigation'
  import { purple, white } from '../utils/colors'
  import { TextInput,KeyboardAvoidingView,ScrollView,Keyboard,TouchableWithoutFeedback } from 'react-native'
  import { connect } from 'react-redux'
  import {addCardToDeck}  from '../utils/api'
  import { fetchDecks  } from '../actions'
  import { NavigationActions } from 'react-navigation'

  function SubmitBtn ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>SUBMIT</Text>
      </TouchableOpacity>
    )
  }

  class NewQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
          question: '',
          answer:''
         };
      }
      componentDidMount(){
        //this.props.itemsFetchDecks();
        const { dispatch } = this.props
      }


    static navigationOptions =({navigation})=> {
      return{
        title:"New Card",
    };
  };

     toDeck(){
       this.props.navigation.dispatch(NavigationActions.back())
     }

      submit = (title) => {

        console.log("add card",title)
        const entry = this.state

        addCardToDeck(title,entry)
        .then((decks) => this.props.dispatch(fetchDecks(decks)))
        .catch((e) =>{
          console.log(e);
          Alert.alert("An error has occurred")
        });
       this.props.navigation.dispatch(NavigationActions.back())

      }

      _keyboardDidHide() {
      Keyboard.dismiss()
    }
    render() {
      const title = this.props.navigation.state.params;
      console.log("params",title)
      const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 0
          return (
            <KeyboardAvoidingView style={ styles.container } behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}  >
              <TouchableOpacity  onPress={this._keyboardDidHide}>
                <View>
                <Text style={styles.topDescription}>Question:</Text>
              <TextInput multiline = {true} numberOfLines = {4} style={{height: 80, borderColor: 'gray', borderWidth: 1,fontSize: 20}}
                onChangeText={(question) => this.setState({question})}  value={this.state.question} />
              <Text style={styles.topDescription}>Answer:</Text>
                  <TextInput multiline = {true}
           numberOfLines = {4} style={{height: 80, borderColor: 'gray', borderWidth: 1,fontSize: 20}}
                    onChangeText={(answer) => this.setState({answer})}  value={this.state.answer} />
                  <SubmitBtn onPress={() => this.submit(title)} />
                </View>
              </TouchableOpacity>
           </KeyboardAvoidingView>


            )
  }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingBottom: 20,
      paddingTop: 20,
      backgroundColor: white
    },
    iosSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
      marginTop:30
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
      marginTop:50
    },
    submitBtnText: {
      color: white,
      fontSize: 22,
      textAlign: 'center',

    },    
    topDescription: {
        marginTop: 20,
        textAlign: 'center',
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 20
     },

  })

  export default connect(
    null,
  )(NewQuestion)
