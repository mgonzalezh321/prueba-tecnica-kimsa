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
      text: '',
      page: 1
    },
    data: { institutions: [], specialists: [], last_page: 1 },
    loading: false
  }

  onValueChangeMin = (value) => {
    this.setState({
      filters: { ...this.state.filters, selectedMin: value, page: 1 },
      data: { institutions: [], specialists: [], last_page: 1 },
    }, () => this.getProvidersData());
  }

  onValueChangeMax = (value) => {
    this.setState({
      filters: { ...this.state.filters, selectedMax: value, page: 1 },
      data: { institutions: [], specialists: [], last_page: 1 },
    }, () => this.getProvidersData());
  }


  _onChangeSearchText = (_text) => {
    this.setState({
      filters:
        { ...this.state.filters, text: _text, page: 1 },
      data: { institutions: [], specialists: [], last_page: 1 },
    }, () => this.getProvidersData())
  }

  handleAllType = () => {
    this.setState({
      filters: {
        ...this.state.filters,
        all: true,
        institutions: false,
        specialists: false,
        page: 1
      },
      data: { institutions: [], specialists: [], last_page: 1 },
    }, () => this.getProvidersData())
  }

  handleInstitutionsType = () => {
    this.setState({
      filters: {
        ...this.state.filters,
        all: false,
        institutions: true,
        specialists: false,
        page: 1
      },
      data: { institutions: [], specialists: [], last_page: 1 },
    }, () => this.getProvidersData())
  }

  handleSpecialistsType = () => {
    this.setState({
      filters: {
        ...this.state.filters,
        all: false,
        institutions: false,
        specialists: true,
        page: 1
      },
      data: { institutions: [], specialists: [], last_page: 1 },
    }, () => this.getProvidersData())
  }


  getProvidersData = () => {
    //this.scrollView.scrollToEnd({ animated: true })
    this.activateLoading();

    const query = this.query.createQuery(this.state.filters)

    this.client.getProviders(query).then((res) => {
      if (this.state.filters.page > 1) {
        this.setState({
          data: {
            institutions: this.state.data.institutions.slice().concat(res.institutions),
            specialists: this.state.data.specialists.slice().concat(res.specialists),
            last_page: res.last_page
          }
        })
      }
      else {
        this.setState({
          data: res
        })
      }
      this.deactivateLoading();
    })
  }


  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
  }



  isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return contentOffset.y == 0;
  }

  activateLoading = () => {
    this.setState({ loading: true })
  }

  deactivateLoading = () => {
    this.setState({ loading: false })
  }

  handleEndScreen = () => {
    this.setState({ filters: { ...this.state.filters, page: this.state.filters.page + 1 } }, () => {
      this.getProvidersData()
    })
  }

  handleLimitScrolling = ({ nativeEvent }) => {
    if (this.isCloseToBottom(nativeEvent) && this.state.data.last_page > 1) {
      this.handleEndScreen()
    }
  }


  render() {
    const { all, institutions, specialists, selectedMin, selectedMax } = this.state.filters
    const { data } = this.state
    return (
      <Container>
        <Header searchBar rounded autoCorrect={false} hasSegment>
          <Item>
            <Icon name="ios-search" />
            <Input
              onChangeText={this._onChangeSearchText} // <-- Here
              placeholder={"Escribe aquí para buscar"}
            />
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
        <ScrollView
          ref={ref => this.scrollView = ref}
          onScroll={this.handleLimitScrolling}>
          <ListSearch data={data} loading={this.state.loading} />
        </ScrollView>
      </Container>
    );
  }
}

const compare = (obj1, obj2) => {
  if (!Object.keys(obj2).every(key => obj1.hasOwnProperty(key))) {
    return false;
  }
  return Object.keys(obj1).every(function (key) {
    if ((typeof obj1[key] == "object") && (typeof obj2[key] == "object")) {
      return compare(obj1[key], obj2[key]);
    } else {
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
