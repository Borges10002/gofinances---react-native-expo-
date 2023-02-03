import React from "react";
import { Button } from "../../components/Form/Button";

import { Input } from "../../components/Form/Input";

import { Container, Heander, Title, Form, Fields } from "./styles";

export function Register() {
  return (
    <Container>
      <Heander>
        <Title>Cadastro</Title>
      </Heander>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
