'use strict';
import React, {
  Component,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet
} from 'react-native';

import NoteCard from './note_card';
import Store from '../lib/store';
var store = new Store();

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

  render() {
    return (
      <View style={styles.container}>
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
    paddingTop: 40,
    // alignItems: 'center',
    backgroundColor: '#eeeeee',
  },

  scroll: {
    height: 900,
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: 'yellow'
  },

  cards: {
    flexDirection: 'row',
  }
});

export default Notes;
