'use strict';
import React, {
  Component,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet
} from 'react-native';
import NavigationBar from 'react-native-navbar';

import NoteCard from './note_card';
import Store from '../lib/store';
var store = new Store();
// var StatusBar = require('./status_bar');
// import StatusBar from './status_bar';
var NavButton = require('./nav_button');

class Notes extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {notes: []};

    store.getNotes(props.navigator.username, (error, notes) => {
      if (error) {
        console.log('Notes store.getNotes error:', error);
      }
      this.setState({notes});
    });
  }

  newNote(props) {
    this.props.navigator.push({name: 'note_form'});
  }

  render() {
    const rightButtonConfig = <NavButton text={'New'} onPress={event => this.newNote(this.props)} />;

    const titleConfig = {
      title: 'Notes',
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          style={styles.navBarStyle}
          rightButton={rightButtonConfig} />

        <ScrollView
          automaticallyAdjustContentInsets={true}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          style={styles.scroll}>

          <View style={styles.cards}>
            {this.state.notes.map((note) => {
              return <NoteCard key={note.id} note={note} navigator={this.props.navigator} />
            })}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: 40,
    // alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },

  scroll: {
    height: 900,
    flexDirection: 'row',
    // borderWidth: 1,
    marginTop: 10,
    backgroundColor: '#F5F7FA'
  },

  cards: {
    flexDirection: 'row',
  },

  navBarStyle: {
    backgroundColor: '#F5F7FA',
  }
});

export default Notes;
