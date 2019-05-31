import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import Star from 'react-native-star-view';

const arreglo = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] 

export default class ListSearch extends Component {
  render() {
    const { institutions, specialists } = this.props.data
    return (
      <Content>
        <List>
          {
            specialists.map((s, index) => { return (<Item key={index} firstName={s.user.first_name} lastNames={s.user.last_names}></Item>) })
          }
        </List>
      </Content>
    );
  }
}

const Item = ({firstName, lastNames}) => {
  return (
    <ListItem thumbnail style={{ height: 'auto' }}>
      <Left>
        <Thumbnail square source={{ uri: 'Image URL' }} />
      </Left>
      <Body>
        <Text>{firstName} {lastNames}</Text>
        <Star score={4.7} style={styles.starStyle} />
        <Text note numberOfLines={1}>4.7 - 10 calificaciones</Text>
      </Body>
      <Right >
        <Button style={styles.buttonItems}>
          <Text>Agendar</Text>
        </Button>
        <Button style={styles.buttonItems}>
          <Text>Presupuesto</Text>
        </Button>
      </Right>
    </ListItem>)
}

const styles = {
  starStyle:{
    width: 100,
    height: 20,
  },
  buttonItems:{
    width:120
  }
}
