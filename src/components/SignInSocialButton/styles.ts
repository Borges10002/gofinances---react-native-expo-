import styled from "styled-components/native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { ReactNode } from "react";

interface ContainerProps extends RectButtonProps {
  children: ReactNode;
}

export const Button = styled(RectButton)<RectButtonProps>``;

export const ImageContainer = styled.View``;

export const Text = styled.Text``;
