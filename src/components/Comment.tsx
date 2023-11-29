import React from 'react';
import styled from 'styled-components';

export interface CommentType {
  id: number | string;
  user: string;
  text: string;
  article: string;
  className?: string;
}

export const Comment: React.FC<CommentType> = ({ className, user, text }) => (
  <StyledComment className={className}>
    <h4>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      <span>{user}</span>
    </h4>
    <p>{text}</p>
  </StyledComment>
);

const StyledComment = styled.div`
  &:hover svg {
    color: tomato;
  }

  h4 {
    display: flex;
    align-items: center;
    margin: 0;

    svg {
      display: block;
      width: 32px;
      margin-right: 10px;

      transition: all 0.5s ease-in-out;
    }

    span {
      font:
        700 18px/26px 'EB Garamond',
        serif;
    }
  }

  p {
    margin: 10px 0 0;
    padding-left: 40px;
  }
`;
