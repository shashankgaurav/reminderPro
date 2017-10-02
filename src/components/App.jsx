import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators } from 'redux';
import {addReminder, deleteReminder, clearReminders} from '../actions';
import moment from 'moment';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder = () => {
    console.log(this.state.dueDate);
      this.props.addReminder(this.state.text, this.state.dueDate);
    }

  deleteReminder = (id) => {
    this.props.deleteReminder(id);
    }

  renderReminder = () => {
    const { reminders } = this.props;
    // var tomorrow = new Date(year, month,day);
    // console.log(tomorrow);
    return(
      <ul className = "list-group col-sm-4">
        {
          reminders.map(reminder => {
            return(
                <li key = {reminder.id} className="list-group-item">
                  <div className = "list-item">
                    <div>{reminder.text}</div>
                    <div>{moment(new Date(reminder.dueDate)).fromNow()}</div>
                  </div>
                  <div className = "list-item delete-button"
                    onClick = {() => this.deleteReminder(reminder.id)}>
                    &#x2716;
                  </div>
                </li>
                  )
              }
          )}
      </ul>
    )

  }

  render(){
    return(
      <div className = "App">
        <div className = "title">
          Reminder Pro
        </div>
        <div className = "form-inline reminder-form">
          <div className = "form-group">
            <input
              className = "form-control"
              placeholder = "I have too..."
              onChange = { event => this.setState({text: event.target.value}) }
              onKeyPress = { event => {
                if (event.key === 'Enter')
                {this.addReminder()}
              }}
            />

          <input
            className = "form-control"
            type = "datetime-local"
            onChange = {event => this.setState({dueDate: event.target.value})}
          />
          </div>
          <button
            type = "button"
            className = "btn btn-success"
            onClick = { () => this.addReminder() }>
              Add Reminder
            </button>
        </div>
        { this.renderReminder() }

        <div
          className = "btn btn-danger"
          onClick = {()=>this.props.clearReminders()}
          >Clear Reminders</div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return{
    reminders: state
  }
}

 function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({addReminder, deleteReminder, clearReminders},dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
