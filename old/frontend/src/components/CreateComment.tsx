import React, { ChangeEvent, FormEvent, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { addComment } from '../store/commentsSlice'
import { Loader } from './Loader'

interface Props {
  articleId: string
  className?: string
}

export const CreateComment: React.FC<Props> = ({ className, articleId }) => {
  const [state, setState] = useState<{ user?: string; text: string; article: string }>({
    user: '',
    text: '',
    article: articleId,
  })

  const { loading, error } = useAppSelector((state) => state.comments.adding)
  const dispatch = useAppDispatch()

  const onChange = (field: 'user' | 'text') => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({ ...state, [field]: e.target.value })
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = state.text.trim()

    if (text) {
      dispatch(
        //@ts-ignore
        addComment({
          ...state,
          text,
          user: state?.user?.trim() || 'Unknown',
        })
      )

      setState({ ...state, user: '', text: '' })
    }
  }

  if (error) return <h2 style={{ textAlign: 'center' }}>{error}</h2>

  if (loading) return <Loader />

  return (
    <StyledForm className={className} onSubmit={onSubmit}>
      <p>Add Comment</p>
      <input type="text" placeholder="@nickname" value={state.user} onChange={onChange('user')} />
      <textarea placeholder="Message*" value={state.text} onChange={onChange('text')} required />
      <button>Add</button>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  p {
    margin: 0;
    font: 700 18px/26px 'EB Garamond', serif;
  }

  input,
  textarea {
    display: block;
    background-color: transparent;
    border: 1px solid #d9d9d9;

    outline: 0;

    &:hover {
      border-color: tomato;
    }

    &:focus,
    &:active,
    &:focus-within {
      border-color: red;
    }
  }

  input,
  textarea,
  button {
    margin-top: 16px;
    padding: 10px;

    border-radius: 4px;

    transition: all 0.5s ease-in-out;
  }

  input {
    width: 100%;
    max-width: 50%;
    height: 42px;
  }

  textarea {
    width: 100%;
    height: 84px;
    resize: none;
  }

  button {
    min-width: 150px;

    background-color: tomato;
    border: none;

    color: white;
    text-align: center;
    cursor: pointer;

    &:hover {
      background-color: red;
    }

    &:active {
      box-shadow: inset 0 0 8px #000;
      transition: all 0.1s ease-in-out;
    }
  }
`
