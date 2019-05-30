import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text, Radio, Body, ListItem, Content, Segment, List } from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import ListSearch from './ListSearch'

export default class Searcher extends React.Component {
  static navigationOptions = {
    title: 'Buscar',
  };

  state = {
    scrollEnabled: true,
    multiSliderValue: [3, 7],
    nonCollidingMultiSliderValue: [0, 100],
  }
  enableScroll = (ranges) => {
    console.log(ranges)
    this.setState({ scrollEnabled: true })
  };
  disableScroll = () => this.setState({ scrollEnabled: false });

  multiSliderValuesChange = values => {
    this.setState({
      multiSliderValue: values,
    });
  };

  _onChangeSearchText = (text) => {
    console.log(text)
  }
  render() {
    return (
      <Container>
        <Header searchBar rounded autoCorrect={false}>
          <Item>
            <Icon name="ios-search" />
            <Input
              onChangeText={this._onChangeSearchText.bind(this)} // <-- Here
              placeholder="Search"
            />
            <Icon name="ios-people" />
          </Item>
        </Header>
        <Segment>
          <Button first active><Text>Todo</Text></Button>
          <Button ><Text>Centros</Text></Button>
          <Button last ><Text>Especialistas</Text></Button>
        </Segment>
        <Text style={styles.text}>Reputación desde {this.state.multiSliderValue[0]} a {this.state.multiSliderValue[1]}</Text>
        <List>
          <ListItem style={styles.text}>
            <MultiSlider
              values={[
                this.state.multiSliderValue[0],
                this.state.multiSliderValue[1],
              ]}
              sliderLength={280}
              onValuesChange={this.multiSliderValuesChange}
              min={0}
              max={10}
              step={1}
              allowOverlap
              snapped
            />
          </ListItem>
        </List>
        <ListSearch />

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliders: {
    margin: 20,
    width: 280,
  },
  text: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
