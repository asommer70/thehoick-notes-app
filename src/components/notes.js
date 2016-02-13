'use strict';
import React, {
  Component,
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

import Store from '../lib/store';
var store = new Store();

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {notes: []};

    store.getNotes(username, (error, notes) => {
      if (error) {
        console.log('Notes store.getNotes error:', error);
      }
      this.setState({notes});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Notes here...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee'
  },
});

export default Notes;
