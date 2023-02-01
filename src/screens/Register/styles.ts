import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components";

export const Container = styled.view`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Heander = styled.view`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.view`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Form = styled.view`
  flex: 1;

  width: 100%;

  padding: 24px;
`;
