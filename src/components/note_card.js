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

    this.title = this.note.get('title');
    
    if (this.note.get('text').length > 20) {
      this.text = this.note.get('text').substring(0, 20) + '...';
    } else {
      this.text = this.note.get('text');
    }

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
    shadowColor: '#222324',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
    width: 130,
    margin: 10
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3CCFDF'
  },

  hr: {
    borderBottomWidth: 1,
    borderColor: '#222324',
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
