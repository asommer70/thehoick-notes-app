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
var NavButton = require('./nav_button');

class Note extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {id: '', title: '', text: '', users: [], tags: [], share: false, shareUser: ''};
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

  render() {
    const rightButtonConfig = <NavButton text={'Edit'} onPress={event => console.log('pressed...')} />;
    const leftButtonConfig = <NavButton text={'Back'} onPress={event => this.goBack(event)} />;

    const titleConfig = {
      title: 'The Hoick Notes',
      style: {
        backgroundColor: '#eeeeee'
      }
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          style={styles.navBarStyle}
          rightButton={rightButtonConfig}
          leftButton={leftButtonConfig} />

        <View style={styles.centerWrapper}>
          <View style={styles.noteDeets}>
            <Text style={styles.title}>{this.state.title}</Text>

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
    alignItems: 'center',
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
  },

  scroll: {
    height: 400,
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
  }
});

export default Note;