import React from 'react';
import './Item.css';

type Props = {
  title: string;
  text?: string;
};

export const Item = ({ title, text }: Props) => {
  return (
    <div className="item">
      <h1>{title}</h1>
      <p>{text ? text : 'hello text'}</p>
    </div>
  );
};
