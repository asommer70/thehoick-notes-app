import React, {
  Component,
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

import Store from '../lib/store';
const store = new Store();

if (React.Platform.OS == 'ios') {
  var Button = require('./button');
} else {
  // import { Button } from 'react-native-material-design';
  // import { typography } from 'react-native-material-design-styles';
  // const typographyStyle = StyleSheet.create(typography);
}

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: ''
    };
  }

  signup() {
    console.log('signing up...');
    if (this.state.password !== this.state.confirmPass ) {
      return this.setState({errorMessage: 'Your passwords do not match', messageVisible: true});
    }

    store.createUser(this.state.username, this.state.password, (error, user) => {
      if (error) {
        this.setState({errorMessage: error.message});
      } else {
        this.props.navigator.immediatelyResetRouteStack([{name: 'main'}]);
      }
    });
  }

  onSigninPress() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>

        <Text style={styles.label}>Username:</Text>
        <TextInput
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
          style={styles.input} />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
          style={styles.input} />

        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          secureTextEntry={true}
          value={this.state.passwordConfirmation}
          onChangeText={(text) => this.setState({passwordConfirmation: text})}
          style={styles.input} />

        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <Button text={'Signup'} onPress={this.signUp.bind(this)} />
        <Button text={'I have an account...'} onPress={this.onSigninPress.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  label: {
    fontSize: 18
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
  }
});

export default Signup;
