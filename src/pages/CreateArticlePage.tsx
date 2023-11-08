import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Loader } from '../components/Loader';
import styled from 'styled-components';
import { addArticle } from '../store/articlesSlice';
import { Modal } from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const initialState = {
  user: '',
  text: '',
  title: '',
  imgUrl: '',
};

const CreateArticlePage = () => {
  const [state, setState] = useState<{ user: string; text: string; title: string; imgUrl: string }>(initialState);
  const [success, setSuccess] = useState(false);

  const { loading, error } = useAppSelector((state) => state.articles);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange =
    (field: 'imgUrl' | 'user' | 'title' | 'text') => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({ ...state, [field]: e.target.value });
    };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const title = state.title.trim();
    const text = state.text.trim();

    if (text && title) {
      //@ts-ignore
      dispatch(addArticle({ user: state.user.trim(), text, title, imgUrl: state.imgUrl.trim() }));

      setState(initialState);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/');
      }, 1500);
    }
  };

  if (error) return <h2 style={{ textAlign: 'center' }}>{error}</h2>;

  if (loading) return <Loader />;

  return (
    <StyledForm onSubmit={onSubmit}>
      <h2>Create your own Article</h2>
      <input type="text" placeholder="Title*" value={state.title} onChange={onChange('title')} required />
      <StyledInputGroup>
        <input type="text" placeholder="Image url" value={state.imgUrl} onChange={onChange('imgUrl')} />
        <input type="text" placeholder="@nickname" value={state.user} onChange={onChange('user')} />
      </StyledInputGroup>
      <textarea placeholder="Text*" value={state.text} onChange={onChange('text')} required />
      <button>Create</button>

      <Modal visible={success && !loading}>Your article was created</Modal>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  position: relative;

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
`;

const StyledInputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -8px;

  input {
    margin-left: 8px;
    margin-right: 8px;
  }
`;

export default CreateArticlePage;
