
import React from 'react';
import { ApolloProvider } from 'react-apollo';
//import { Query } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider, useQuery, useMutation } from 'react-apollo-hooks';
import { Radio, RadioGroup } from 'react-radio-group';
import './App.css'


/** 쿼리 */
import { GET_TEXT_COLOR, SET_TEXT_COLOR_UPDATE, SET_TEXT_COLOR_PUSH } from './graphql/queries'

/** 아폴로 boost 버전 */
import client from './graphql/clientBoostVersion';

/** 아폴로 no boost 버전 */
//import client from './graphql/clientNoBoostVersion';


const Header = () => {
  /** react-apollo-hooks 사용 */
  const { data, error, loading } = useQuery(GET_TEXT_COLOR);
  if (loading) return <span>loading...</span>
  if (error) return <span>error!</span>

  return (
  // <Query query={GET_TEXT_COLOR}>
  //   {({data}) => (
      <header>
        <h2 className={data.textColor.value}>Hello World!!</h2>
      </header>
  //   )}
  // </Query>
  );
};

const TextColorOptions = () => {

  // const setTextColor = color => {
  //   client.mutate({
  //     mutation: SET_TEXT_COLOR,
  //     variables: { color }
  //   })
  // };

  /** react-apollo-hooks 사용 */
  const setTextColor = useMutation(SET_TEXT_COLOR_UPDATE);
  const { data, error, loading } = useQuery(GET_TEXT_COLOR);
  if (loading) return <span>loading...</span>
  if (error) return <span>error!</span>
    
  return (
    // <Query query={GET_TEXT_COLOR}>
    //   {({client, data}) => (
        <div>
          <p>색깔을 선택하세요:</p>
          <RadioGroup
            name='textColor'
            //onChange={color => setTextColor(color)}

            /** react-apollo-hooks 사용 */
            onChange={color => setTextColor({variables: {color}})}

            selectedValue={data.textColor.value}
          >
            <Radio value='blue' id='blue' />
            <label htmlFor='blue' className='blue'>
              blue
            </label>

            <Radio value='green' id='green' />
            <label htmlFor='green' className='green'>
              green
            </label>

            <Radio value='red' id='red' />
            <label htmlFor='red' className='red'>
              red
            </label>
          </RadioGroup>
        </div>
    //   )}
    // </Query>
  )
}

const TextColorPush = () => {
  const { data, error, loading } = useQuery(GET_TEXT_COLOR);
  const setTextColorPush = useMutation(SET_TEXT_COLOR_PUSH, {
    variables: {color: data.textColor.value}
  });


  if (loading) return <span>loading...</span>
  if (error) return <span>error!</span>


  console.log('data:', data);
  return (
    <div>
      <br></br>
      <button onClick={setTextColorPush}>선택한 색상을 상태값 data에 push</button>
      <div>
        {
          data.textColor.values.map((textColor, index) => (
            <div key={index}>
              {textColor}
            </div>
          ))
        }
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Header />
          <TextColorOptions />
          <TextColorPush />
        </ApolloHooksProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
