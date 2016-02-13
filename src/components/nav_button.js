var React = require('react-native');
var {
  Text,
  StyleSheet,
  TouchableHighlight
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor={'gray'}
        onPress={this.props.onPress}
        >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: '#424242',
    // marginTop: 10
    marginLeft: 3,
    marginRight: 3,
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 12
  }
});
