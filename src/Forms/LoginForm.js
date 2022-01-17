import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useSpinner } from '../Layout/Spinner/Spinner';
import Messages from '../Layout/Messages/Messages';


async function loginUser(loginData) {
  return await fetch(process.env.REACT_APP_SERVER+ '/login', {
    method: 'post',
    mode: 'cors',
    headers: {
    },
    body: JSON.stringify({
      email: loginData.email,
      password: loginData.password
    })
  });
};

export default function LoginForm() {
  const [email, setEmail] = useState("u1@host.com");
  const [password, setPassword] = useState("1234");
  const [msg, setMsg] = useState('');
  const [err_msg, setErr_msg] = useState('');
  const { authObj, dispatch } = useAuth();
  const setSpin = useSpinner(false);

  const handleSubmit = async e => {
    setSpin(true);
    e.preventDefault();
    await loginUser({
      email,
      password
    })
    .then(res => {
      setSpin(false);
      if (res.status >= 500) {
        setMsg('');
        setErr_msg(res.statusText);
        return false;
      } else {
        return res.json();
      }
    })
    .then(resp => {
      // Error 4xx. resp.error is my msg added in backend
      if (resp.error) {
        setMsg('');
        setErr_msg(resp.error);
        return false;
      }
      if (resp) {
      return (
        dispatch({
          type: "setUser", payload: {
            user: { userId: 1, userEmail: email },
            token: resp.Authorization.split(' ')[1]
          }
        })
      )}
    });
    return false;
  };

  const formComp = (
    (authObj && authObj.user && authObj.user.userId)
    ?
      <Navigate to="/" />
    :
      <div className="d-flex justify-content-center">
        <div className="">
          <h1>Please Log In</h1>
          <form onSubmit={handleSubmit}>
            <Messages msg={msg} err_msg={err_msg} />
            <div className="mb-3">
              <label>
                <div>Email</div>
                <input type="text"
                  value={email} onChange={e => setEmail(e.target.value)} />
              </label>
            </div>
            <div className="mb-3">
              <label>
                <div>Password</div>
                <input type="password"
                  value={password} onChange={e => setPassword(e.target.value)} />
              </label>
            </div>
            <div className="mb-3">
              <button id='subut' type="submit">Submit</button>
            </div>
          </form>
          <Link to="/auth/signup">Don't have an account?</Link>
        </div>
      </div>
  );

  return formComp;
}