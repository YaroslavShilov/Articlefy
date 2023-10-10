import React, { FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

export const Search: React.FC<{ initialValue?: string }> = ({ initialValue = '' }) => {
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

  const sendHandler = (e: FormEvent) => {
    e.preventDefault()

    const title = value.trim()
    if (title) {
      navigate(`/search/${value}`)
      if (!initialValue) setValue('')
    }
  }

  return (
    <StyledSearch onSubmit={sendHandler}>
      <input type="text" placeholder="Search" value={value} onChange={onChange} />
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </StyledSearch>
  )
}

const StyledSearch = styled.form`
  display: flex;
  align-items: stretch;

  input {
    flex: 1 1 100%;
    height: 42px;
    padding: 10px;

    border: 1px solid #d9d9d9;
    border-right-width: 0;
    border-radius: 4px 0 0 4px;
    transition: all 0.5s ease-in-out;

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

  button {
    flex: 0 0 42px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: tomato;
    border: none;
    border-radius: 0 4px 4px 0;

    cursor: pointer;
    transition: all 0.5s ease-in-out;

    &:hover {
      background-color: red;
    }

    &:active {
      box-shadow: inset 0 0 8px #000;
      transition: all 0.1s ease-in-out;
    }
  }

  svg {
    max-width: 20px;
    color: white;
  }
`
