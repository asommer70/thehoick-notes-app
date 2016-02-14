import React, { Component, StyleSheet, Navigator } from 'react-native';

import Signin from './components/signin';
import Signup from './components/signup';
import Notes from './components/notes';
import Note from './components/note';
import NoteForm from './components/note_form';

// window.navigator.userAgent = "react-native";

var ROUTES = {
  signin: Signin,
  signup: Signup,
  note: Note,
  note_form: NoteForm,
  notes: Notes
};

window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');

// Setup the socket.
socket = io.connect('http://192.168.0.36:7070', {jsonp: false});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    var Component = ROUTES[route.name]; // ROUTES['signin'] => Signin
    navigator.username = 'adam';
    return <Component route={route} navigator={navigator} socket={socket} />;
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'notes'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Main;
