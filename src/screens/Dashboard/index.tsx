import React from "react";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: "Venda", icon: "dollar-sign" },
      date: "13/04/2020",
    },

    {
      id: "2",
      type: "postive",
      title: "Desenvolvimento de mobile",
      amount: "R$ 12.500,00",
      category: { name: "Venda", icon: "coffee" },
      date: "15/06/2021",
    },

    {
      id: "3",
      type: "negative",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: { name: "Alimentação", icon: "slash" },
      date: "15/03/2020",
    },

    {
      id: "4",
      type: "negative",
      title: "Energia",
      amount: "R$ 200,00",
      category: { name: "Casa", icon: "shopping-bag" },
      date: "16/10/2021",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/32522338?v=4.png",
              }}
            />
            <User>
              <UserGreeting>Olá</UserGreeting>
              <UserName>Diego Borges</UserName>
            </User>
          </UserInfo>
          <Icon name='power' />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type='up'
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abriel'
        />

        <HighlightCard
          type='down'
          title='Saídas'
          amount='R$ 1.259,00'
          lastTransaction='Última saída dia 03 de abriel'
        />

        <HighlightCard
          type='total'
          title='Total'
          amount='R$ 16.141.00'
          lastTransaction='01 à 16 de abriel'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtactor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
