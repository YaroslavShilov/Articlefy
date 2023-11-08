import React, { useEffect, useState } from 'react';
import { Article, ArticleType } from '../components/Article';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchPartArticles, sortArticles } from '../store/articlesSlice';
import styled from 'styled-components';
import { Loader } from '../components/Loader';

const HomePage = () => {
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState<'new' | 'old' | ''>('');
  const { pageArticles, loading, sorting, error } = useAppSelector<{
    pageArticles: { list: ArticleType[] | null; hasMore: boolean };
    loading: boolean;
    sorting: boolean;
    error: string | null;
  }>((state) => state.articles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchPartArticles(offset));
  }, [offset, dispatch]);

  const btnHandler = (type: 'prev' | 'next') => () => {
    setOffset(type === 'prev' ? offset - 4 : offset + 4);
  };

  const sortHandler = (type: 'new' | 'old') => () => {
    setSort(type);
    //@ts-ignore
    dispatch(sortArticles(type));
  };

  if (error) return <h2 style={{ textAlign: 'center' }}>Home error: {error}</h2>;

  if (!pageArticles.list) return <Loader />;

  console.log('page articles: ', pageArticles);

  return (
    <React.Fragment>
      <StyledSort>
        <p>Sort: </p>
        <button onClick={sortHandler('new')} disabled={sort === 'new'}>
          New
        </button>
        <button onClick={sortHandler('old')} disabled={sort === 'old'}>
          Old
        </button>
      </StyledSort>

      {sorting && <Loader />}

      {!sorting && (
        <React.Fragment>
          {pageArticles.list.map((article) => (
            <StyledArticle key={article.id} {...article} text="" />
          ))}

          {loading ? (
            <Loader />
          ) : (
            <StyledButtons>
              <button onClick={btnHandler('prev')} disabled={offset === 0}>
                Prev
              </button>
              <button onClick={btnHandler('next')} disabled={!pageArticles.hasMore}>
                Next
              </button>
            </StyledButtons>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HomePage;

const StyledArticle = styled(Article)`
  margin-bottom: 60px;
`;

const StyledButtons = styled.div`
  margin-top: 40px;

  button {
    min-width: 100px;
    margin-right: 20px;
    padding: 10px;

    text-align: center;

    background-color: transparent;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.5s ease-in-out;

    cursor: pointer;
    outline: 0;

    &:disabled {
      cursor: default;
    }

    &:hover:not(:disabled) {
      border-color: tomato;
    }

    &:focus,
    &:active,
    &:focus-within {
      &:not(:disabled) {
        border-color: red;
      }
    }
  }
`;

const StyledSort = styled(StyledButtons)`
  display: flex;
  align-items: center;
  margin: 0 0 40px;

  p {
    margin: 0 16px 0 0;
    font-weight: 700;
    font-size: 20px;
  }

  button {
    height: auto;
  }
`;
