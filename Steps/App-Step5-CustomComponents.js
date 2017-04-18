import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class CityWeather extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          margin: 10,
        }}
      >
        <Text style={{ width: 100 }}>
          {this.props.name}
        </Text>
        <Text style={{ width: 100 }}>
          {this.props.weather}
        </Text>
        <Text style={{ width: 100 }}>
          {this.props.temp} °F
        </Text>
      </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View>
        <CityWeather
          name="San Jose"
          weather="Mist"
          temp={54.41}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
