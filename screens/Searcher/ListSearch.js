import React, { Component } from 'react';
import { Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Spinner } from 'native-base';
import Star from 'react-native-star-view';

export default class ListSearch extends Component {
  render() {
    const { institutions, specialists } = this.props.data
    return (
      <Content>
        <List>
          {
            specialists.map((s, index) => {
              return (
                <SpecialistItem
                  key={index}
                  firstName={s.user.first_name}
                  lastNames={s.user.last_names}
                  description={s.user.description}
                  phone1={s.user.phone1}
                  email={s.user.email}
                />)
            })
          }
          {
            institutions.map((s, index) => {
              return (
                <InstitutionItem
                  key={index}
                  name={s.institution.name}
                  description={s.institution.description}
                />
              )
            })
          }
          {this.props.loading ? (
            <ListItem>
              <Spinner color='blue' />
              <Text>Buscando</Text>
            </ListItem>) : <React.Fragment />
          }
        </List>
      </Content>
    );
  }
}

const urlTest = 'https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png' // url de imagen de usuario por defecto

// NOTA: Las estrellas que se refieren al ranking están solo de forma visual ya que el endpoint no entregaba el ranking promedio.

const SpecialistItem = ({ firstName, lastNames, phone1, description, email }) => {
  return (
    <ListItem thumbnail style={{ height: 'auto' }}>
      <Left>
        <Thumbnail square source={{ uri: urlTest }} />
      </Left>
      <Body>
        <Text>{firstName} {lastNames}</Text>
        <Star score={4.7} style={styles.starStyle} />
        <Text note numberOfLines={1}>4.7 - 10 calificaciones</Text>
        <Text note numberOfLines={4}>{description}</Text>
        <Text note numberOfLines={2}>Teléfono: {phone1}</Text>
        <Text note numberOfLines={2}>{email}</Text>
      </Body>
      <Right >
        <Button transparent style={styles.buttonItems}>
          <Text>Agendar</Text>
        </Button>
        <Button transparent style={styles.buttonItems}>
          <Text>Presupuesto</Text>
        </Button>
      </Right>
    </ListItem>)
}

const InstitutionItem = ({ name, description }) => {
  return (
    <ListItem thumbnail style={{ height: 'auto' }}>
      <Left>
        <Thumbnail square source={{ uri: urlTest }} />
      </Left>
      <Body>
        <Text>{name}</Text>
        <Star score={4.7} style={styles.starStyle} />
        <Text note numberOfLines={1}>4.7 - 10 calificaciones</Text>
        <Text note numberOfLines={4}>{description}</Text>
      </Body>
      <Right >
        <Button transparent style={styles.buttonItems}>
          <Text>Agendar</Text>
        </Button>
        <Button transparent style={styles.buttonItems}>
          <Text>Presupuesto</Text>
        </Button>
      </Right>
    </ListItem>)
}

const styles = {
  starStyle: {
    width: 100,
    height: 20,
  },
  buttonItems: {
    width: 120
  }
}
