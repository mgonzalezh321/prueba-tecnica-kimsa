import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text, Body, ListItem, Content, Segment, List, Form, Picker, Spinner } from 'native-base';
import ListSearch from './ListSearch'
import QueryBuilder from '../../misc/QueryBuilder'
import HTTPClient from '../../misc/HTTPClient'

export default class Searcher extends React.Component {
  static navigationOptions = {
    title: 'Buscar',
  };

  constructor(props) {
    super(props)
    this.client = new HTTPClient()
    this.query = new QueryBuilder()
  }

  state = {
    filters: {
      selectedMin: 1,
      selectedMax: 5,
      all: true,
      institutions: false,
      specialists: false,
      text: ''
    },
    data: {institutions: [], specialists: []}
  }

  onValueChangeMin = (value) => {
    this.setState({ filters: { ...this.state.filters, selectedMin: value } }, () => this.getProvidersData());
  }

  onValueChangeMax = (value) => {
    this.setState({ filters: { ...this.state.filters, selectedMax: value } }, () => this.getProvidersData());
  }


  _onChangeSearchText = (text) => {
    this.setState({ filters: { ...this.state.filters, text } }, () => this.getProvidersData() )
  }

  handleAllType = () => {
    this.setState({
      filters: {
        ...this.state.filters,
        all: true,
        institutions: false,
        specialists: false,
      }
    }, () => this.getProvidersData())
  }

  handleInstitutionsType = () => {
    this.setState({
      filters: {
        ...this.state.filters,
        all: false,
        institutions: true,
        specialists: false,
      }
    }, () => this.getProvidersData())
  }

  handleSpecialistsType = () => {
    this.setState({
      filters: {
        ...this.state.filters,
        all: false,
        institutions: false,
        specialists: true,
      }
    }, () => this.getProvidersData())
  }


  getProvidersData = async () => {
    const query = this.query.createQuery(this.state.filters)
    var res = await this.client.getProviders(query)
    this.setState({
      data: res
    })
  }

  render() {
    const {all, institutions, specialists, selectedMin, selectedMax} = this.state.filters
    const { data } = this.state

    return (
      <Container>
        <Header searchBar rounded autoCorrect={false} hasSegment>
          <Item>
            <Icon name="ios-search" />
            <Input
              onChangeText={this._onChangeSearchText} // <-- Here
              placeholder="Escribe aquí para buscar"
            />
            <Icon name="ios-people" />
          </Item>
        </Header>
        <Segment>
          <Button first active={all} onPress={() => this.handleAllType()}><Text>Todo</Text></Button>
          <Button active={institutions} onPress={() => this.handleInstitutionsType()} ><Text>Centros</Text></Button>
          <Button last active={specialists} onPress={() => this.handleSpecialistsType()}><Text>Especialistas</Text></Button>
        </Segment>
        <Form>
          <Item>
            <Text>Ranking entre </Text>
            <Picker
              note
              mode="dropdown"
              style={{ width: undefined }}
              selectedValue={selectedMin}
              onValueChange={this.onValueChangeMin}
              itemStyle={{
                width: undefined
              }}
            >
              <Picker.Item label="1" value={1} />
              <Picker.Item label="2" value={2} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="4" value={4} />
              <Picker.Item label="5" value={5} />
            </Picker>
            <Text> y </Text>
            <Picker
              note
              mode="dropdown"
              style={{ width: undefined }}
              selectedValue={selectedMax}
              onValueChange={this.onValueChangeMax}
              itemStyle={{
                width: undefined
              }}
            >
              <Picker.Item label="1" value={1} />
              <Picker.Item label="2" value={2} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="4" value={4} />
              <Picker.Item label="5" value={5} />
            </Picker>
          </Item>
        </Form>
        <ListItem itemHeader first style={{ paddingBottom: -20 }}>
          <Text>Resultados</Text>
        </ListItem>
        {/*
        <Spinner color='blue' />
        */}
        <ListSearch data={data} />
      </Container>
    );
  }
}

const compare = (obj1, obj2) => {
  //check for obj2 overlapping props
  if (!Object.keys(obj2).every(key => obj1.hasOwnProperty(key))) {
    return false;
  }

  //check every key for being same
  return Object.keys(obj1).every(function (key) {

    //if object
    if ((typeof obj1[key] == "object") && (typeof obj2[key] == "object")) {

      //recursively check
      return compare(obj1[key], obj2[key]);
    } else {

      //do the normal compare
      return obj1[key] === obj2[key];
    }
  });
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
