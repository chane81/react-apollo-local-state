import { GET_TEXT_COLOR } from './queries'

export const defaults = {
  textColor: {
    value: 'green',
    values: ['green'],
    __typename: 'ColorValue',
  }
};

// export const typeDefs = [
//   `
//   schema {
//     query: Query
//     mutation: Mutation
//   }
//   type TextColor {
//     value: String!
//   }
//   type Query {
//     getTextColor: TextColor!    
//   } 
//   type Mutation {
//     setTextColor(color: String!): TextColor!
//   } 
//   `
// ];

export const resolvers = {
  Mutation: {
    setTextColorUpdate: (_, {color}, {cache}) => {
      const { textColor: prevTextColor } = cache.readQuery({ query: GET_TEXT_COLOR });
      const newTextColor = {
        ...prevTextColor,
        value: color,
        __typename: 'ColorValue'
      };

      const data = { textColor: newTextColor, __typename: 'TextColor' };

      console.log('prevTextColor', prevTextColor);
      console.log('newTextColor', newTextColor);

      cache.writeData({data});

      return data;
    },
    setTextColorPush: (_, {color}, {cache}) => {
      const { textColor: prevTextColor } = cache.readQuery({ query: GET_TEXT_COLOR });
      const newTextColor = {
        ...prevTextColor,
        values: [...prevTextColor.values, color],
        __typename: 'ColorValue'
      };

      const data = { textColor: newTextColor, __typename: 'TextColor'}

      console.log('prevTextColor', prevTextColor);
      console.log('newTextColor', newTextColor);

      cache.writeData({data});

      return data;
    },
    setTextColorRemove: (_, __, {cache}) => {
      const { textColor: prevTextColor } = cache.readQuery({ query: GET_TEXT_COLOR });
      const newTextColor = {
        ...prevTextColor,
        values: prevTextColor.values.slice(0, -1)
      };
  
      const data = { textColor: newTextColor, __typename: 'TextColor' };
  
      console.log('prevTextColor', prevTextColor);
      console.log('newTextColor', newTextColor);
  
      cache.writeData({data});
  
      return data;
    }
  }
};