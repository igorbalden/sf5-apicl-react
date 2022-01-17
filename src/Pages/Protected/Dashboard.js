import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/authContext';
import Main from '../../Layout/Main';
import Messages from '../../Layout/Messages/Messages';
import LoginForm from '../../Forms/LoginForm';
import { useSpinner } from '../../Layout/Spinner/Spinner';


export default function Dashboard() {
  const { authObj } = useAuth();
  const [msg, setMsg] = useState('');
  const [err_msg, setErr_msg] = useState('');
  const [userList, setUserList] = useState(null);
  const setSpin = useSpinner(false);

  const getUsers = useCallback(async ()=> {
    return await fetch(process.env.REACT_APP_SERVER+ "/users", {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+ authObj.token,
        'Content-Type': 'application/json'
      }
    });
  }, [authObj]);

  // Content Request 
  useEffect(()=> {
    async function reqUsers() {
      setSpin(true);
      await getUsers()
      .then((res)=> {
        setSpin(false);
        if (res.status >= 500) {
          setMsg('');
          setErr_msg(res.statusText);
          return false;
        } else {
          return res.json();
        }
      })
      .then((resp)=> {
        if (resp.error) {
          setMsg('');
          setErr_msg(resp.error);
          return false;
        }
        if (resp) {
          setUserList(resp);
          setMsg(resp.msg);
          setErr_msg('');
          return false;
        }
      });
      return false;
    } 
    if (authObj && authObj.user && /^\d+$/.test(authObj.user.userId)) {
      reqUsers();
    }
  },[authObj, getUsers, setSpin]);


  // Page
  const page = (
    (authObj && authObj.user && !/^\d+$/.test(authObj.user.userId))
    ?
      <LoginForm />
    :
      <>
        <h2>Dashboard</h2>
        <Messages msg={msg} err_msg={err_msg} />
        User: {authObj.user.userEmail}
        <h3 className='mt-4'>User List</h3>
        <div className='tableResponsive'>
          <table className='table'>
            <tbody>
            {
              userList
              ?
              userList.map((user, i)=> {
                return (
                  <tr key={i}>
                    <td>{JSON.stringify(user)}</td>
                  </tr>
                );
              })
              : 
              <tr><td></td></tr>
            }
            </tbody>
          </table>
        </div>
      </>
  );

  return <Main content={page} />
}