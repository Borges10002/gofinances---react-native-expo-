import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export function Profile() {
  return (
    <View>
      <Text>Perfil</Text>

      <TextInput
        value="diego"
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
      />

      <TextInput
        value="borges"
        testID="input-surname"
        placeholder="Sobrenome"
      />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}
