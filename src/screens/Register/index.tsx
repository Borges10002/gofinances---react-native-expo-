import React, { useState } from "react";
import { Button } from "../../components/Form/Button";

import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

import {
  Container,
  Heander,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

export function Register() {
  const { transactionType, setTransactionType } = useState("");

  return (
    <Container>
      <Heander>
        <Title>Cadastro</Title>
      </Heander>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionTypes>
            <TransactionTypeButton type="up" title="Income" />
            <TransactionTypeButton type="down" title="Outcome" />
          </TransactionTypes>
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
