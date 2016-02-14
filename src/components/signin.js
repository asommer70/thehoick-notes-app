'use strict';
import React, {
  Component,
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

import Store from '../lib/store';
const store = new Store();

var Button = require('./button');

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      username: '',
      password: '',
      errorMessage: ''
    };
  }

  onSignupPress(props) {
    this.props.navigator.push({name: 'signup'});
  }

  signIn() {
    store.signIn(this.state.username, this.state.password, (error, user) => {
      console.log('signIn error:', error);
      if (error) {
        this.setState({errorMessage: error.message});
      } else {
        this.props.navigator.username = this.state.username;
        this.props.navigator.immediatelyResetRouteStack([{name: 'notes'}]);
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>The Hoick Sign In</Text>

        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
          />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
          />

        <Text style={styles.error}>{this.state.errorMessage}</Text>

        <Button text={'Sign In'} onPress={this.signIn.bind(this)} />
        <Button text={'I need an account...'} onPress={this.onSignupPress.bind(this)} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },

  title: {
    fontSize: 22,
    marginBottom: 20
  },

  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },

  label: {
    fontSize: 18
  },

  error: {
    color: '#ED6C63',
    padding: 10
  }
});

export default Signin;
