'use strict';
import React, {
  Component,
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import NavigationBar from 'react-native-navbar';

import Store from '../lib/store';
const store = new Store();
var Button = require('./button');
var NavButton = require('./nav_button');

window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log('this.props:', this.props);

    this.state = {id: '', title: '', text: '', users: [this.props.navigator.username], tags: [], created_by: this.props.navigator.username, new: true};

    // Get the route stack and check for name 'note' at position 1.
    const current = props.navigator.getCurrentRoutes()

    if (this.props.navigator.noteId && current[1] && current[1].name == 'note') {
      store.findNote(this.props.navigator.noteId, (error, note) => {
        console.log('note:', note);
        this.setState({
          id: note.id,
          title: note.get('title'),
          text: note.get('text'),
          users: note.get('users'),
          tags: note.get('tags'),
          created_by: note.get('created_by'),
          new: false
        });
      });
    }

    // Setup the socket.
    this.socket = io.connect('http://localhost:7070', {jsonp: false});

    // Listen for 'text-entered' event.
    this.socket.on('text-entered', (obj) => {
      console.log('txt:', obj.txt, 'name:', obj.name);

      var newState = {};
      newState[obj.name] = obj.txt;
      this.setState(newState);
    });
  }

  saveNote(event) {
    console.log('saveNote this.state:', this.state);
    if (this.state.new) {
      // Create Note.
      store.createNote(this.state, (error, note) => {
        if (error) {
          console.log('saveNote error:', error);
        }
        this.setState({note});
        this.props.navigator.resetTo({name: 'notes'});
      });
    } else {
      // Update Note.
      if (this.state.users.indexOf(this.username) === -1) {
        var users = this.state.users;
        users.push(this.username);
        this.setState({users: users}, () => {
          store.updateNote(this.state, (error, note) => {
            if (error) {
              console.log('saveNote error:', error);
            }
            console.log('saveNote updated note:', note);
            this.setState({note});
            console.log('this.props:', this.props);
            this.props.navigator.immediatelyResetRouteStack([{name: 'notes'}, {name: 'note'}]);
          });
        })
      } else {
        store.updateNote(this.state, (error, note) => {
          if (error) {
            console.log('saveNote error:', error);
          }
          console.log('saveNote updated note:', note);
          this.setState({note});
          console.log('this.props:', this.props);
          this.props.navigator.immediatelyResetRouteStack([{name: 'notes'}, {name: 'note'}]);
        });
      }
    }
  }

  deleteNote(event) {
    console.log('deleting note...');
    store.deleteNote(this.state, (status) => {
      console.log('deleteNote status:', status);
      this.props.navigator.resetTo({name: 'notes'});
    });
  }

  goBack(event) {
    this.props.navigator.pop();
  }

  render() {
    const leftButtonConfig = <NavButton text={'Back'} onPress={event => this.goBack(event)} />;

    if (this.state.new) {
      var title = 'New Note';
    } else {
      var title = 'Edit Note';
    }

    const titleConfig = {
      title: title,
      style: {
        backgroundColor: '#F5F7FA',
        color: '#222324'
      }
    };

    var delButton = <Button text={'Delete Note'} onPress={event => this.deleteNote(event)} buttonStyle={styles.delButton} textStyle={styles.delText}/>;
    if (this.state.new) {
      var delButton = <View/>
    }

    return (
      <View style={styles.container}>

        <NavigationBar
          title={titleConfig}
          style={styles.navBarStyle}
          leftButton={leftButtonConfig} />

        <View style={styles.centerWrapper}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={this.state.title}
          onChangeText={(text) => this.socket.emit('text-entered', {txt: text, name: 'title'})}
          />

        <Text style={styles.label}>Text:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.textBox}
          value={this.state.text}
          multiline={true}
          onChangeText={(text) => this.socket.emit('text-entered', {txt: text, name: 'text'})}
          />

        <Text style={styles.label}>{this.state.errorMessage}</Text>

        <View style={styles.rowWrapper}>
          <Button text={'Save Note'} onPress={event => this.saveNote(event)} buttonStyle={styles.saveButton} textStyle={styles.saveText}/>
          {delButton}
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  centerWrapper: {
    alignItems: 'center',
    marginTop: 40
  },

  rowWrapper: {
    flexDirection: 'row'
  },

  input: {
    padding: 4,
    height: 40,
    borderColor: '#DBDEE3',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 300,
    alignSelf: 'center',
    fontSize: 16,
    backgroundColor: 'white',
    color: '#222324'
  },

  textBox: {
    padding: 4,
    borderColor: '#DBDEE3',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 300,
    alignSelf: 'center',
    height: 300,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#222324'
  },

  label: {
    fontSize: 18,
    color: '#222324'
  },

  navBarStyle: {
    backgroundColor: '#F5F7FA',
    alignItems: 'flex-start',
  },

  saveButton: {
    backgroundColor: '#97CD76',
    borderColor: '#97CD76',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 10
  },

  saveText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
    color: 'white'
  },

  delButton: {
    borderColor: '#ED6C63',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    marginLeft: 40
  },

  delText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 12,
    color: '#ED6C63'
  },
});

export default NoteForm;
