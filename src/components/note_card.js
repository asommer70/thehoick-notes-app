'use strict';
import React, {
  Component,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import Store from '../lib/store';
var store = new Store();

class NoteCard extends Component {
  constructor(props) {
    super(props);
    this.note = this.props.note;

    // Truncate the note.title property.
    var trimmedTitle = this.note.get('title').substr(0, 10);
    trimmedTitle = trimmedTitle.substr(0, Math.min(trimmedTitle.length, trimmedTitle.lastIndexOf(" ")))
    this.title = trimmedTitle;

    // Truncate the note.text property.
    var trimmedText = this.note.get('text').substr(0, 17);
    trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")))
    this.text = trimmedText;

    this.created_at = `${this.note.createdAt.getMonth() + 1}-${this.note.createdAt.getDate() - 1}-${this.note.createdAt.getFullYear()}`;
  }

  getNote() {
    console.log('getting Note... note.id', this.note.id);
    this.props.navigator.noteId = this.note.id;
    this.props.navigator.push({name: 'note'});
  }

  render() {
    return (
      <View>
        <View style={styles.card}>
          <TouchableHighlight underlayColor={'#cccccc'} onPress={this.getNote.bind(this)}>
            <Text style={styles.title}>{this.title}</Text>
          </TouchableHighlight>

          <Text>{this.text}</Text>

          <View style={styles.hr}/>

          <Text>@{this.note.get('created_by')}</Text>
          <Text style={styles.info}>{this.created_at}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#424242',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 3,
    width: 130,
    margin: 10
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue'
  },

  hr: {
    padding: 1,
    backgroundColor: '#424242',
    width: 100,
    marginTop: 10,
    marginBottom: 10
  },

  info: {
    marginTop: 2,
    marginBottom: 2
  },
});

export default NoteCard;
