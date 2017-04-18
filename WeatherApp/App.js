import React from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

class LoadingIndicator extends React.Component {
  render() {
    return (
      <View
        style={{
          paddingTop: 10,
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }
}

class CityWeather extends React.Component {
  render() {
    return (
      <ListItem
        title={this.props.name}
        subtitle={
          this.props.weather ? this.props.weather : 'TBD'
        }
        badge={{
          value: this.props.temp ? this.props.temp : '0 °F',
          badgeContainerStyle: {
            backgroundColor: 'lightblue',
          },
        }}
        avatar={{ uri: this.props.icon }}
        onPress={
          this.props.onPress ? this.props.onPress() : null
        }
        hideChevron={Platform.OS !== 'ios'}
      />
    );
  }
}

class MasterScreen extends React.Component {
  static navigationOptions = {
    title: 'Weather',
  };

  constructor() {
    super();

    this.state = {
      cities: [
        { name: 'San Jose', id: 5392171 },
        { name: 'New York', id: 5128581 },
        { name: 'London', id: 2643744 },
        { name: 'Paris', id: 2968815 },
        { name: 'Hong Kong', id: 1819729 },
        { name: 'Singapore', id: 1880252 },
        { name: 'Beijing', id: 1816670 },
        { name: 'Sydney', id: 6619279 },
        { name: 'São Paulo', id: 3448439 },
        { name: 'San Juan', id: 4568138 },
        { name: 'Mumbai', id: 1275339 },
        { name: 'Reykjavík', id: 6692263 },
      ],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    const ids = this.state.cities
      .map(city => city.id)
      .toString();

    fetch(
      `http://api.openweathermap.org/data/2.5/group?units=imperial&APPID=b1b35bba8b434a28a0be2a3e1071ae5b&id=${ids}`
    )
      .then(res => res.json())
      .then(body =>
        body.list.map(city => {
          return {
            id: city.id,
            name: city.name,
            temp: city.main.temp,
            icon: 'http://openweathermap.org/img/w/' +
              city.weather[0].icon +
              '.png',
            weather: city.weather[0].main,
          };
        }))
      .then(cities => {
        this.setState({
          cities,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        {this.state.cities.map(city => (
          <CityWeather
            key={city.id}
            name={city.name}
            temp={city.temp}
            weather={city.weather}
            icon={city.icon}
            onPress={() =>
              () =>
                this.props.navigation.navigate('Detail', {
                  cityId: city.id,
                })}
          />
        ))}
      </ScrollView>
    );
  }
}

class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  constructor() {
    super();

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    const cityId = this.props.navigation.state.params.cityId;

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=b1b35bba8b434a28a0be2a3e1071ae5b&id=${cityId}`
    )
      .then(res => res.json())
      .then(jsonRes => {
        this.setState({
          isLoading: false,
          city: {
            name: jsonRes.name,
            weather: jsonRes.weather[0].main,
            temp: jsonRes.main.temp,
            temp_min: jsonRes.main.temp_min,
            temp_max: jsonRes.main.temp_max,
            humidity: jsonRes.main.humidity,
            pressure: jsonRes.main.pressure,
            wind_speed: jsonRes.wind.speed,
            cloudiness: jsonRes.clouds.all,
            icon: 'http://openweathermap.org/img/w/' +
              jsonRes.weather[0].icon +
              '.png',
          },
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    const { city } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ListItem
          key={city.id}
          title={city.name}
          subtitle={city.weather}
          avatar={{ uri: city.icon }}
          badge={{
            value: city.temp + ' °F',
            badgeContainerStyle: {
              backgroundColor: 'lightblue',
            },
          }}
          hideChevron
        />
        <ListItem
          title="Humidity"
          rightTitle={city.humidity + '%'}
          hideChevron
        />
        <ListItem
          title="Pressure"
          rightTitle={city.pressure + ' hPa'}
          hideChevron
        />
        <ListItem
          title="Wind Speed"
          rightTitle={city.wind_speed + ' mph'}
          hideChevron
        />
        <ListItem
          title="Cloud Cover"
          rightTitle={city.cloudiness + '%'}
          hideChevron
        />
      </View>
    );
  }
}

export default (MainNavigator = StackNavigator({
  Master: { screen: MasterScreen },
  Detail: { screen: DetailScreen },
}));
