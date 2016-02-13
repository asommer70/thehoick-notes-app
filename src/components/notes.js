'use strict';
import React, {
  Component,
  View,
  Text,
  TextInput,
  ScrollView,
  ListView,
  StyleSheet
} from 'react-native';
import NavigationBar from 'react-native-navbar';

import NoteCard from './note_card';
import Store from '../lib/store';
var store = new Store();
var NavButton = require('./nav_button');

class Notes extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {notes: [], dataSource: ds.cloneWithRows([])};

    store.getNotes(props.navigator.username, (error, notes) => {
      if (error) {
        console.log('Notes store.getNotes error:', error);
      }
      this.setState({dataSource: ds.cloneWithRows(notes)});
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

          <ListView contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <View style={styles.item}>
              <View style={styles.cards}>
                <NoteCard key={rowData.id} note={rowData} navigator={this.props.navigator} />
              </View>
            </View>
            }
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5F7FA',
  },

  centerWrapper: {
    justifyContent: 'center',
    marginTop: 40,
  },


  navBarStyle: {
    backgroundColor: '#F5F7FA',
  },

  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    margin: 10,
    width: 130,
  }
});

export default Notes;
