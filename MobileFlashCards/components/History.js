import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import { white } from '../utils/colors'
import DateHeader from './DateHeader'
import MetricCard from './MetricCard'
import { AppLoading} from 'expo'
import { fetchCalendarResults } from '../utils/api'

/**
 * This component is based on the History component that was created in UdacityFitness example
 * as part of Udacity nanodegree.
 */
class History extends Component {
  state = {
    ready: false,
  }
  componentWillMount () {
    const { dispatch } = this.props

    fetchCalendarResults()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        time = timeToString()
        if (!(time in entries)) {
          dispatch(addEntry({
            [time]: getDailyReminderValue()
          }
        ))
       }

      })
      .then(() => this.setState(() => ({ready: true})))
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => (

    <View style={styles.item}>
      {today
        ? <View>
            <DateHeader date={formattedDate}/>
            <Text style={styles.noDataText}>
              {today}
            </Text>
          </View>
        : <View>
            <MetricCard date={formattedDate} metrics={metrics} />
            </View>
          }

    </View>
  )
  renderEmptyDate(formattedDate) {
    return (
      <View style={styles.item}>
        <DateHeader date={formattedDate}/>
        <Text style={styles.noDataText}>
          You did not log any data on this day.
        </Text>
      </View>
    )
  }
  render() {

    const { entries } = this.props
    const { ready } = this.state
    if (ready === false) {
      return <AppLoading />
    }

    return (

      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    )
  }
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})


function mapStateToProps (state) {
  return {
    entries:state.entries
  }
}

export default connect(
  mapStateToProps,
)(History)
