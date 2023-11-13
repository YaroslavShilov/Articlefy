import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export type ArticleType = {
  id: string | number;
  date: Date;
  imgUrl?: string;
  title: string;
  text?: string;
  user?: string;
};

export const Article: React.FC<ArticleType & { className?: string }> = ({
  id,
  date,
  imgUrl,
  title,
  text,
  user,
  className,
}) => (
  <article className={className}>
    <StyledTitle>
      <h2>
        <time>{moment(date).format('LLL')}</time>
        <Link to={`/article/${id}`}>{title}</Link>
        {user && <span>by {user}</span>}
      </h2>

      <img src={imgUrl || 'https://picsum.photos/150/104'} alt="ArticlePage" />
    </StyledTitle>

    {text && <p>{text}</p>}
  </article>
);

const StyledTitle = styled.div`
  display: flex;
  align-items: center;

  img {
    order: -1;
    width: 150px;
    height: 104px;
    object-fit: cover;
    border-radius: 4px;
  }

  time {
    display: inline-block;

    font-weight: 400;
    font-size: 16px;
    color: gray;
  }

  h2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    padding-left: 20px;

    a {
      position: relative;
      display: inline-block;

      font:
        700 27px/32px 'EB Garamond',
        serif;
      color: black;
      text-decoration: none;

      &:after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;

        width: 0;
        height: 2px;
        background-color: black;
        transition: all 0.5s ease-in-out;
      }

      &:hover:after {
        width: 100%;
      }
    }

    span {
      margin-top: 2px;
      color: gray;
      font-weight: 400;
      font-size: 14px;
      opacity: 0.8;
    }
  } /*END h2*/
`;
