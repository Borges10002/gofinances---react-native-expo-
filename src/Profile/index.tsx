import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export function Profile() {
  return (
    <View>
      <Text>Perfil</Text>

      <TextInput placeholder="Nome" autoCorrect={false} />

      <TextInput placeholder="Sobrenome" />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}
