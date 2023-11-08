import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Article, ArticleType } from '../components/Article';
import { fetchArticles } from '../store/articlesSlice';
import { Loader } from '../components/Loader';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Search } from '../components/Search';

const SearchPage = () => {
  const [filtered, setFiltered] = useState<ArticleType[] | []>([]);
  const { title } = useParams();
  const { list, loading, error } = useAppSelector((state) => state.articles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchArticles("Sorry, I can't find any article"));
  }, [dispatch, title]);

  useEffect(() => {
    if (list) {
      //@ts-ignore
      setFiltered(list.filter((article) => article.title.trim().toUpperCase().includes(title.toUpperCase())));
    }
  }, [list, title]);

  return (
    <React.Fragment>
      <h2>Search Page</h2>
      <Search initialValue={title} />
      <StyledContent>
        {loading && <Loader />}
        {error && <h2 style={{ textAlign: 'center' }}>{error}</h2>}

        {!loading && filtered.map((article) => <StyledArticle key={article.id} {...article} text="" />)}
        {!loading && !filtered.length && <h3 style={{ margin: 0 }}>Didn't find anything</h3>}
      </StyledContent>
    </React.Fragment>
  );
};

const StyledArticle = styled(Article)`
  &:not(:last-of-type) {
    margin-bottom: 60px;
  }
`;

const StyledContent = styled.div`
  padding: 40px 0;
`;

export default SearchPage;
