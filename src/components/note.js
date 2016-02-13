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
var Button = require('./button');
var NavButton = require('./nav_button');

class Note extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {id: '', title: '', text: '', users: [], tags: [], share: false, shareUser: '', sharing: false};
    console.log('note this.props:', this.props);

    store.findNote(this.props.navigator.noteId, (error, note) => {
      console.log('note:', note);
      console.log('note.title:', note.get('title'));

      this.setState({
        id: note.id,
        title: note.get('title'),
        text: note.get('text'),
        users: note.get('users'),
        tags: note.get('tags'),
        created_by: note.get('created_by'),
        created_at: `${note.createdAt.getMonth() + 1}-${note.createdAt.getDate() - 1}-${note.createdAt.getFullYear()}`
      });
    });
  }

  goBack(event) {
    this.props.navigator.pop();
  }

  editNote(props) {
    props.navigator.push({name: 'note_form'});
  }

  shareNote(event) {
    if (this.state.users.indexOf(this.state.shareUser === -1)) {
      var users = this.state.users;
      users.push(this.state.shareUser);

      this.setState({users: users}, (note) => {
        store.updateNote(this.state, (error, note) => {
          if (error) {
            console.log('saveNote error:', error);
          }
          console.log('saveNote updated note:', note);
          this.setState({
            id: note.id,
            title: note.get('title'),
            text: note.get('text'),
            users: note.get('users'),
            tags: note.get('tags'),
            sharing: false,
            shareUser: ''
          });
          // this.props.history.push(`/notes/${note.id}`);
        });
      });
    }
  }

  render() {
    const rightButtonConfig = <NavButton text={'Edit'} onPress={event => this.editNote(this.props)} />;
    const leftButtonConfig = <NavButton text={'Back'} onPress={event => this.goBack(event)} />;

    const titleConfig = {
      title: 'Note',
      style: {
        backgroundColor: '#F5F7FA'
      }
    };

    if (this.state.sharing) {
      var shareInput = <TextInput style={styles.input} value={this.state.shareUser} onChangeText={(text) => this.setState({shareUser: text})} />;
      var shareButton = <Button text={'Share'} onPress={event => this.shareNote(this.props)} buttonStyle={styles.sharingButton} textStyle={styles.shareText} />;
      var cancelButton = <Button text={'Cancel'} onPress={event => this.setState({sharing: false})} buttonStyle={styles.shareButton} textStyle={styles.shareText} />;
    } else {
      var shareInput = <View/>;
      var shareButton = <View/>;
      var cancelButton = <View/>;
    }

    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          style={styles.navBarStyle}
          rightButton={rightButtonConfig}
          leftButton={leftButtonConfig} />

        <View style={styles.centerWrapper}>
          <View style={styles.noteDeets}>

            <View style={styles.rowView}>
              <Text style={styles.title}>{this.state.title}</Text>

              <Button text={'Share'} onPress={event => this.setState({sharing: true})} buttonStyle={styles.shareButton} textStyle={styles.shareText}/>
            </View>
            <View style={styles.rowView}>

              {shareInput}
            </View>

              <View style={styles.rowView}>
              {shareButton}
              {cancelButton}
            </View>

            <ScrollView
              automaticallyAdjustContentInsets={false}
              onScroll={() => { console.log('onScroll!'); }}
              scrollEventThrottle={200}
              style={styles.scroll}>
              <Text style={styles.text}>{this.state.text}</Text>
            </ScrollView>

            <View style={styles.rowView}>
              <Text style={styles.createdBy}>@{this.state.created_by}</Text>
              <Text style={styles.info}>{this.state.created_at}</Text>
            </View>
            <View style={styles.rowView}>
              <Text>Users: </Text>
              {this.state.users.map((user, index) => {
                return <Text style={styles.users} key={index}>{user}</Text>
              })}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },

  centerWrapper: {
    alignItems: 'center',
  },

  noteDeets: {
    alignItems: 'center',
    marginTop: 20,
    width: 300,
    justifyContent: 'center',
    shadowColor: '#424242',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: 'white',
    // borderWidth: 1,
    // marginLeft: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#222324'
  },

  scroll: {
    height: 320,
    width: 250,
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },

  hr: {
    padding: 1,
    backgroundColor: '#424242',
    width: 100,
    marginTop: 10,
    marginBottom: 10
  },

  text: {
    padding: 20,
  },

  rowView: {
    // marginTop: 5,
    flexDirection: 'row',
    padding: 5
  },

  createdBy: {
    // marginTop: 10,
    marginRight: 10
  },

  navBarStyle: {
    backgroundColor: '#F5F7FA',
    alignItems: 'flex-start',
  },

  input: {
    padding: 4,
    height: 40,
    borderColor: '#222324',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 150,
    alignSelf: 'center',
    fontSize: 16,
    backgroundColor: '#DBDEE3',
    color: '#222324'
  },

  shareButton: {
    borderColor: '#222324',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    marginLeft: 40,
    backgroundColor: 'white'
  },

  shareText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 12,
    color: '#222324'
  },

  sharingButton: {
    borderColor: '#222324',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    // marginTop: 10,
    // marginLeft: 40,
    backgroundColor: 'white'
  },

  users: {
    marginLeft: 5,
    marginRight: 5
  }
});

export default Note;
