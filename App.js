import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements'
import dictionary from './database';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      text: '',
      isSearchPressed: false,
      word: '',
      lexicalCategory: '',
      examples: [],
      definition: '',
    }
  }

  getWord = (text) => {
    try {
      var word = dictionary[text]["word"];
      var lexicalCategory = dictionary[text]["lexicalCategory"];
      var definition = dictionary[text]["definition"];

      this.setState({
        word: word,
        lexicalCategory: lexicalCategory,
        definition: definition
      })
    } catch (error) {
      alert('Sorry this word is not available for now')
      this.setState({
        text: '',
        isSearchPressed: false
      })
    }
  }

  render() {
    return (
      <DismissKeyboard>
        <View style={styles.screenContainer}>
          <Header centerComponent={{ text: 'Pocket Dictionary', style: { marginTop: 10, fontSize: 22, fontFamily: 'Futura-Medium' } }} containerStyle={{ height: 70, backgroundColor: '#2fd666' }} />
          <View style={styles.main}>
            <View style={styles.inputFieldContainer}>
              <TextInput style={styles.inputField} textAlign={'center'} onChangeText={text => {
                this.setState({
                  text: text,
                  isSearchPressed: false,
                  word: '',
                  lexicalCategory: '',
                  examples: [],
                  definition: '',
                })
              }} value={this.state.text} />
            </View>
            <View style={styles.searchContainer}>
              <TouchableOpacity style={styles.searchButton} onPress={() => {
                this.setState({ isSearchPressed: true });
                this.getWord(this.state.text);
              }}>
                <Text style={styles.searchText}>Search!</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.wordDefinitionSection}>
              <View style={styles.wordDefinitionContainer}>
                {this.state.word !== '' && <Text style={styles.wordDefinitionText}>Word: {this.state.word}</Text>}
               {this.state.lexicalCategory !== '' && <Text style={styles.wordDefinitionText}>Type: {this.state.lexicalCategory}</Text>}
                {this.state.definition !== '' && <Text style={styles.wordDefinitionText}>Definition: {this.state.definition}</Text>}
              </View>
            </View>
          </View>
        </View>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#34b79f',
  },
  main: {
    flex: 1,
    flexDirection: 'column'
  },
  inputFieldContainer: {
    flex: .17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    height: '50%',
    width: '75%',
    backgroundColor: '#075e54',
    borderRadius: 15
  },
  searchContainer: {
    flex: .15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    height: '75%',
    width: '75%',
    backgroundColor: '#075e54',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchText: {
    fontSize: 28,
    fontFamily: 'Futura-Medium'
  },
  wordDefinitionSection: {
    flex: .68,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordDefinitionContainer: {
    width: '90%',
    height: '90%',
    backgroundColor: '#075e54',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  wordDefinitionText: {
    fontSize: 20,
    fontFamily: 'Futura-Medium'
  }
});
