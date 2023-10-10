import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Item } from './Item';
import { Picture } from './Picture';

const MoreCode = lazy(() => import(/* webpackChunkName: "more-code" */ './MoreCode'));
const MuchMoreCode = lazy(() => import(/* webpackChunkName: "much-more-code" */ './MuchMoreCode'));

const imgStyle = {
  height: 150,
};

type Post = {
  id: number;
  title: string;
  author: string;
};

export const App = () => {
  // @ts-ignore
  console.log('env: ', process.env['REACT_APP_KEY']);
  const [posts, setPosts] = useState<Post[]>([]);
  // this code for checking codeSplitting
  const [blocks, setBlocks] = useState<string[]>([]);

  useEffect(() => {
    // this code for checking proxying;
    fetch('api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  const isVisible = (name: string): boolean => blocks.includes(name);

  const toggleBlock = (name: string) => () => {
    if (isVisible(name)) {
      setBlocks(blocks.filter((itemName) => itemName !== name));
    } else {
      setBlocks([...blocks, name]);
    }
  };

  return (
    <div>
      <img style={imgStyle} src={require('../img/jpg.jpg')} alt="jpg" />
      <img style={imgStyle} src={require('../img/png.png')} alt="png" />
      <img style={imgStyle} src={require('../img/svg.svg')} alt="svg" />
      <Picture
        style={imgStyle}
        src={require('../img/webp.webp')}
        fallbackSrc={require('../img/webp.jpg')}
        alt="webp - jpg"
        media="(max-width: 1020px)"
        mediaSrc={require('../img/webp-mob.webp')}
        mediaFallbackSrc={require('../img/webp-mob.jpg')}
      />
      <Item title="Hello" />
      {posts && posts.map(({ id, title, author }) => <Item key={id} title={title} text={author} />)}
      <button onClick={toggleBlock('moreCode')}>{isVisible('moreCode') ? 'hide' : 'show'} more code</button>
      <br />
      <button onClick={toggleBlock('muchMoreCode')}>
        {isVisible('muchMoreCode') ? 'hide' : 'show'} much more code
      </button>
      <br />
      <Suspense>
        {blocks.map((name) => (
          <Content key={name} name={name} />
        ))}
      </Suspense>
    </div>
  );
};

const Content = ({ name }: { name: string }) => {
  switch (name) {
    case 'moreCode':
      return <MoreCode />;
    case 'muchMoreCode':
      return <MuchMoreCode />;
    default:
      return null;
  }
};
