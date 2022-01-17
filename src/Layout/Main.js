import React from "react";
import { Navigation } from "./Navigation/Navigation";
import { Spinner, useSpinner } from './Spinner/Spinner';


export default function Main(props) {
  useSpinner(false);

  return (
    <>
      <Navigation />
      <div className='container'>
        <Spinner />
        {props.content}
      </div>
    </>
  );
};