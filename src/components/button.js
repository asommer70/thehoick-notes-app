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
        style={[styles.button, this.props.buttonStyle]}
        underlayColor={'#eeeeee'}
        onPress={this.props.onPress}
        >
        <Text style={[styles.buttonText, this.props.textStyle]}>{this.props.text}</Text>
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
    borderColor: '#DBDEE3',
    marginTop: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
    color: '#222324'
  }
});
