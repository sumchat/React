import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { purple, white } from '../utils/colors'
import { TextInput,Animated,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Button,Icon } from 'react-native-elements'
import { submitQuiz } from '../utils/api'
import { receiveEntries } from '../actions'
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'

/**
* The animation part is coded based on the example given in the
* https://github.com/browniefed/examples/blob/animated_basic/flip/animatedbasic/index.android.js
*
*/

 class Quiz extends Component{

  static navigationOptions =({navigation})=> {
    return{
      title:"Quiz",
  };
};
  state = {
    qno: 0,
    quizFinished:false,
    score:0,
  }
  constructor(props){
    super(props);
    this.correct = 0;
    this.incorrect = 0;
    //this.quizFinished = false;
    //this.noquestions = 0;

  }
  componentWillMount(){
    this.animatedValue = new Animated.Value(0);
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }


  flipCard() {
    console.log(this.value)
   if (this.value >= 90) {
     Animated.spring(this.animatedValue,{
       toValue: 0,
       friction: 8,
       tension: 10
     }).start();
   } else {
     Animated.spring(this.animatedValue,{
       toValue: 180,
       friction: 8,
       tension: 10
     }).start();
   }

 }
  prev(){
    if(this.state.qno > 0){
      val = this.state.qno
      this.setState({qno:val - 1})

      }
  }
  next(){
    if(this.state.qno < this.noquestions-1){
      val = this.state.qno
      this.setState({qno:val + 1})


    }

  }
  setNotification(){
    //clear notification and schedule it for next day
    const key = timeToString()
    submitQuiz({key})
    .then((entries) => this.props.dispatch(receiveEntries(entries)))
    clearLocalNotification()
      .then(setLocalNotification)
  }

  incrementScore(){
    this.correct ++
    this.setState({score:this.correct})
    if(this.state.qno == this.noquestions-1){
        this.setState({quizFinished:true})
     }

     if (!this.props.alreadyTakenQuiz)
        {
          this.setNotification()
        }
  }
  decrementScore(){
    if(this.state.qno == this.noquestions-1){
        this.setState({quizFinished:true})
     }
     if (!this.props.alreadyTakenQuiz)
        {
            this.setNotification()
        }

  }

  restartQuiz(){
      this.setState({
      qno: 0,
      quizFinished:false,
      score:0})
  }

  GoToDeck(){
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render(){
    const questions = this.props.navigation.state.params;
    const no = questions.length
    this.noquestions = no
  const frontAnimatedStyle = {
    transform: [
      { rotateY: this.frontInterpolate}
    ]
  }
  const backAnimatedStyle = {
    transform: [
      { rotateY: this.backInterpolate }
    ]
  }
    if (this.state.quizFinished)
    {
      return(
        <View>
          <Text style={styles.topDescription}>Percentage Correct</Text>
          <Text style={styles.topDescription}>{(this.state.score * 100)/this.noquestions} %</Text>
          <TouchableOpacity
              style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
              onPress={()=> this.restartQuiz()}>
              <Text style={styles.submitBtnText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                onPress={()=> this.GoToDeck()}>
                <Text style={styles.submitBtnText}>Back</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return(
    <View style={{flex: 1,flexDirection: 'column'}}>
        <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center'}}>
             <TouchableOpacity onPress={() => this.prev()} >
                 <View style={styles.previcon}>
                      <Icon name="arrow-back" type="Ionicons" size={30} color="white" />
                </View>
            </TouchableOpacity >
              <Text style={styles.topDescription}>{(this.state.qno + 1)} / {no}</Text>
            <TouchableOpacity onPress={() => this.next()} >
                <View style={styles.nexticon}>
                      <Icon name="arrow-forward" type="Ionicons" size={30} color="white" />
                </View>
            </TouchableOpacity >
        </View>
        <View style={{flex: 1,flexDirection: 'column',justifyContent:'center', backgroundColor:'yellow'}}>
         <ScrollView>
            <Animated.View style={[styles.flipCard,frontAnimatedStyle]}>
                <Text style={styles.topDescription}>{questions[this.state.qno].question}</Text>
                <TextButton style={{margin: 20}} onPress={()=>this.flipCard()}>
                      Answer
                </TextButton>
            </Animated.View>
            <Animated.View style={[styles.flipCard,backAnimatedStyle]}>
                <Text style={styles.topDescription}>{questions[this.state.qno].answer}</Text>
                <TextButton style={{margin: 20}} onPress={()=>this.flipCard()}>
                    Question
                </TextButton>
            </Animated.View>
            </ScrollView>
        </View>

            <TouchableOpacity
                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                onPress={()=> this.incrementScore()}>
                <Text style={styles.submitBtnText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                  onPress={()=> this.decrementScore()}>
                  <Text style={styles.submitBtnText}>Incorrect</Text>
            </TouchableOpacity>

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
    //height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop:10,
    marginBottom:10
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
    marginTop:40,
    marginBottom:20
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
    flipCard: {
     position: 'absolute',
    //bottom: 10,
    alignSelf:'center',
//  right: 10,
  //width: 50,
//  height: 50,
    //width: 200,
    //height: 200,
  //  alignItems: 'center',
   justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  previcon:{
    //flex:1,
    paddingTop: 10,
    paddingBottom:10,
    width:40,
    marginRight:20,
    //justifyContent:'flex-start',
    //height:100,
    //alignSelf: 'flex-start',
    //borderRadius:10,
    backgroundColor:"red"
  },
    nexticon:{
      //flex:1,
      paddingTop: 10,
      paddingBottom:10,
      width:40,
      marginLeft:20,
      //justifyContent:'flex-end',
      //height:100,
      //alignSelf: 'flex-end',
      //borderRadius:10,
      backgroundColor:"green"
    }
})

function mapStateToProps (state) {
  const key = timeToString()
  return {
    alreadyTakenQuiz:state.entries[key] && typeof state.entries[key].today === 'undefined'

  }
}

export default connect(mapStateToProps)(Quiz)
