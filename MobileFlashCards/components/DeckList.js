
  import React, { Component } from 'react'
  import {Text,View,StyleSheet,FlatList} from 'react-native'
  import { connect } from 'react-redux';
  import { Button,Icon } from 'react-native-elements'
  import { fetchDecks  } from '../actions'
  import { getAllDecks } from '../utils/api'
  import {ListItem} from 'react-native-elements'
  import { Ionicons } from '@expo/vector-icons'
  import { NavigationActions } from 'react-navigation'



  class DeckList extends React.Component {
    componentWillMount(){
      const { dispatch } = this.props
      getAllDecks()
        .then((decks) => dispatch(fetchDecks(decks)))

    }

    static navigationOptions =({navigation})=> {
      return{
        title:"Deck List",
        headerRight:(<Icon
          name="add-circle"
          color='#ffffff'
          size={40}
          onPress={() => navigation.navigate('NewDeck')}/>),
    };
  };

  onShowDetails = (deck) =>{
    this.props.navigation.navigate('DeckDetail',{...deck});
  }
    renderItem = ({item}) => {
      no = Object.keys(item.questions).length
      subtitlecard = no + " Cards"
      return(
        <ListItem title={item.title}
        subtitle= {subtitlecard}
        onPress={() => this.onShowDetails(item)}
        />

      )

    }
     render(){
       const decks = this.props.decks
       return(
        <FlatList data={decks}
        renderItem={this.renderItem}
        />
       )
      }
  }

  const mapStateToProps = (state) => {
    return {
        decks:state.deck,
    };
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default connect(
    mapStateToProps,
  )(DeckList)
