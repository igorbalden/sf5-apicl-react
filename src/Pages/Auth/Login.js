import React from 'react';
import Main from '../../Layout/Main';
import LoginForm from '../../Forms/LoginForm';

export default function Login() {

  const page = (
    <LoginForm />
  );

  return <Main content={page} />
}