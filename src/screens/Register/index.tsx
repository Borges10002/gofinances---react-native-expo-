import React from "react";

import { Input } from "../../components/Form/Input";

import { Container, Heander, Title, Form } from "./styles";

export function Register() {
  return (
    <Container>
      <Heander>
        <Title>Cadastro</Title>
      </Heander>
      <Form>
        <Input placeholder="Nome" />
        <Input placeholder="Preço" />
      </Form>
    </Container>
  );
}
