import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { purple, white } from '../utils/colors'
import {ListItem} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';

class DeckDetail extends Component{

  addQuestion({title})
  {
   this.props.navigation.navigate('NewQuestion',title)
  }

  startQuiz({questions})
  {
    this.props.navigation.navigate('Quiz',questions)
  }

  render(){
    const {title}= this.props.navigation.state.params;
    //console.log(title)
    var deck = this.props.decks.filter(item => item.title == title)[0]
    var questions = deck.questions
    let no = Object.keys(questions).length
    quest = questions
    return(
      <View style={{flex: 1,flexDirection: 'column'}}>
          <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center'}}>
            <Text style={styles.topDescription}>{title}</Text>
            <Text style={styles.subtitle}>{no} cards</Text>
          </View>
          <View style={{flex: 1,flexDirection: 'column',justifyContent: 'flex-end'}}>
              <TouchableOpacity
                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                  onPress={()=> this.addQuestion({title})}>
                <Text style={styles.submitBtnText}>Add Card</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={() => this.startQuiz({questions})}>
                    <Text style={styles.submitBtnText}>Start Quiz</Text>
              </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    marginTop:10,
    marginBottom:20
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
  topDescription: {
      marginTop: 20,
      textAlign: 'center',
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 20
   },
   subtitle: {
       marginTop: 20,
       textAlign: 'center',
       color: 'blue',
       fontWeight: 'bold',
       fontSize: 20
    },
})

const mapStateToProps = (state) => {
  //console.log(state.deck)
  return {
      decks:state.deck,
  };
}
export default connect(
  mapStateToProps,
)(DeckDetail)
