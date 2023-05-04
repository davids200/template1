import React from "react";
//import style from "./style.module.scss";

export const Card = React.memo(function (props) {
  const {
    title,
    author,
  } = props;

  return (
    <div className='container'>
      <p>{title}</p>
      <p>{author}</p>
    </div>
  );
})