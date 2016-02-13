import React, { Component, StyleSheet, Navigator } from 'react-native';

import Signin from './components/signin';
import Signup from './components/signup';
import Notes from './components/notes';
import Note from './components/note';
import NoteForm from './components/note_form';

var ROUTES = {
  signin: Signin,
  signup: Signup,
  note: Note,
  note_form: NoteForm,
  notes: Notes
};

class Main extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    var Component = ROUTES[route.name]; // ROUTES['signin'] => Signin
    navigator.username = 'adam';
    return <Component route={route} navigator={navigator} />;
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
