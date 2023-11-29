import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchArticle } from '@/store/articlePageSlice';
import { Article as ArticleBlock, ArticleType as ArticleBlockType } from '../components/Article';
import { Loader } from '@/components/Loader';
import styled from 'styled-components';
import { Comment, CommentType } from '@/components/Comment';
import { fetchComments } from '@/store/commentsSlice';
import { CreateComment } from '@/components/CreateComment';
import { Modal } from '@/components/Modal';
import { deleteArticle } from '@/store/articlesSlice';
import { RootState } from '@/store/store';

//BEGIN TODO: Put this to it's slice
interface ArticleType {
  item: ArticleBlockType | null;
  loading: boolean;
  error: string | null;
}

interface CommentsType {
  list: CommentType[] | null;
  loading: boolean;
  error: string | null;
}

const getArticlePage = (state: RootState): ArticleType => state.articlePage;
const getComments = (state: RootState): CommentsType => state.comments;
const getArticles = (state: RootState) => state.articles;
//END TODO: Put this to it's slice

const Article = () => {
  const { id } = useParams();
  const articlePage: ArticleType = useAppSelector(getArticlePage);
  const comments: CommentsType = useAppSelector(getComments);
  const { deleting }: { deleting: boolean } = useAppSelector(getArticles);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [deleteModal, setDeleteModal] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const showCommentsHandler = () => setShowComments((state) => !state);

  const deleteArticleHandler = () => {
    //@ts-ignore
    dispatch(deleteArticle(id));
    setAccepted(true);
  };

  useEffect(() => {
    if (deleteModal && !deleting && accepted) {
      navigate('/');
    }
  }, [deleteModal, deleting, navigate, accepted]);

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchArticle(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (showComments) {
      //@ts-ignore
      dispatch(fetchComments(id));
    }
  }, [id, dispatch, showComments]);

  if (articlePage.error) return <h2 style={{ textAlign: 'center' }}>{articlePage.error}</h2>;

  if (articlePage.loading || !articlePage.item) return <Loader />;

  return (
    <Fragment>
      <ArticleBlock {...articlePage.item} />

      <StyledComments>
        <StyledCommentsHeader theme={{ active: showComments }} onClick={showCommentsHandler}>
          <h3>{showComments ? 'Hide Comments' : 'Show Comments'}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </StyledCommentsHeader>
        {showComments && (
          <StyledCommentsList>
            {comments.error && <h2 style={{ textAlign: 'center' }}>{comments.error}</h2>}
            {(comments.loading || !comments.list) && <Loader />}

            {!comments.loading && comments.list && (
              <Fragment>
                {comments.list.length === 0 ? (
                  <h3 style={{ textAlign: 'center' }}>No comments yet</h3>
                ) : (
                  comments.list.map((comment) => <StyledComment key={comment.id} {...comment} />)
                )}
              </Fragment>
            )}
          </StyledCommentsList>
        )}
        {id && (
          <StyledForm>
            <CreateComment articleId={id} />
          </StyledForm>
        )}
      </StyledComments>

      <StyledModal visible={deleteModal}>
        <StyledModalCont>
          {deleting ? (
            <Fragment>
              <h3>Deleting</h3>
              <Loader />
            </Fragment>
          ) : (
            <Fragment>
              <h3>Do you want to delete this article?</h3>
              <button onClick={deleteArticleHandler}>Yes</button>
              <button onClick={() => setDeleteModal(false)}>No</button>
            </Fragment>
          )}
        </StyledModalCont>
      </StyledModal>

      <StyledRemove>
        <button onClick={() => setDeleteModal(true)}>Delete this article</button>
      </StyledRemove>
    </Fragment>
  );
};

export default Article;

const StyledComments = styled.div`
  margin-top: 16px;
`;

const StyledCommentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 26px;
  padding: 15px 20px;

  border: 1px solid #d9d9d9;
  border-radius: 4px 4px 0 0;

  transition: border-color 0.5s ease-in-out;

  cursor: pointer;

  &:hover {
    border-color: tomato;
  }

  h3 {
    margin: 0 20px 0 0;
    font:
      700 18px/26px 'EB Garamond',
      serif;
  }

  svg {
    display: block;
    width: 20px;

    transform: ${(props) => (props.theme['active'] ? 'rotate(180deg)' : 'none')};
  }
`;

const StyledCommentsList = styled.div`
  padding: 20px;

  border: 1px solid #d9d9d9;
  border-top-width: 0;
`;

const StyledComment = styled(Comment)`
  &:not(:first-of-type) {
    padding-top: 16px;
  }

  &:not(:last-of-type) {
    padding-bottom: 16px;
    border-bottom: 1px solid #d9d9d9;
  }
`;

const StyledForm = styled.div`
  padding: 15px 20px;

  border: 1px solid #d9d9d9;
  border-top-width: 0;
  border-radius: 0 0 4px 4px;
`;

const StyledRemove = styled.div`
  margin-top: 26px;
  text-align: right;

  button {
    min-width: 100px;
    padding: 10px;

    text-align: center;

    background-color: transparent;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.5s ease-in-out;

    cursor: pointer;
    outline: 0;

    &:not(:last-of-type) {
      margin-right: 10px;
    }

    &:hover {
      border-color: tomato;
    }

    &:focus,
    &:active,
    &:focus-within {
      border-color: red;
    }
  }
`;

const StyledModal = styled(Modal)`
  position: fixed;
  width: 50%;
`;

const StyledModalCont = styled(StyledRemove)`
  text-align: center;
`;
