/** gql 도 apollo-boost 에 포함되어 있음 */
//import gql from 'graphql-tag';

import { gql } from 'apollo-boost'

export const GET_TEXT_COLOR = gql`
  query GetTextColor
  {
    textColor @client {
      value
      values
    }
  }
`;

export const SET_TEXT_COLOR_UPDATE = gql`
  mutation SetTextColorUpdate($color: String!) {
    setTextColorUpdate(color: $color) @client {
      textColor
    }
  }
`;

export const SET_TEXT_COLOR_PUSH = gql`
  mutation SetTextColorPush($color: String!) {
    setTextColorPush(color: $color) @client {
      textColor
    }
  }
`;

export const SET_TEXT_COLOR_REMOVE = gql`
  mutation SetTextColorRemove {
    setTextColorRemove @client {
      textColor
    }
  }
`;
