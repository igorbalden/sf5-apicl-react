import React from 'react';
import Main from '../Layout/Main';
import { useAuth } from '../context/authContext';

export default function Home(props) {
  const {authObj} = useAuth();

  const page = (
    (!authObj) 
    ?
      "Loading..."
    :
      <>
        <h2>Homepage</h2>
        {JSON.stringify(authObj)}
      </>
  );

  return <Main content={page} />
}