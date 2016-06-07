'use strict';

import React, {
  AppRegistry,
  Component,
  MapView,
  StyleSheet,
  Text,
  View
} from 'react-native';

var Api = require('./src/api');

var Weather = React.createClass({
  getInitialState(){
    return {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: ' ',
      temperature: ' ',
      description: ' ',
    }
  },
  
  render() {
    return <View style={styles.container}>
      <MapView
        annotations={[this.state.pin]}
        onRegionChangeComplete={this.onRegionChangeComplete}
        style={styles.map}
        >
      </MapView>
      <View style={styles.desc}>
        <Text style={styles.text}>{this.state.city}</Text>
        <Text style={styles.text}>{this.state.temperature}</Text>
        <Text style={styles.text}>{this.state.description}</Text>
      </View>
    </View>
  },
  onRegionChangeComplete(region){
    //console.log(region);
    this.setState({
      pin:{
        latitude: region.latitude,
        longitude: region.longitude
      }
    });
    
    Api(region.latitude, region.longitude)
      .then((data) => {
      console.log(data);
        this.setState(data);
    });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 20,
  },
  desc: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontSize: 40
  }
});

AppRegistry.registerComponent('Project', () => Weather);
