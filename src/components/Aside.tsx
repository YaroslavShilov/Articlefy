import { Search } from './Search';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Aside = () => (
  <StyledAside>
    <StyledLogo to="/">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
      <span>Articlefy</span>
    </StyledLogo>
    <Search />
    <nav>
      <StyledList>
        <li>
          <Link to="/add-article">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            <span>Add new</span>
          </Link>
        </li>
      </StyledList>
    </nav>
  </StyledAside>
);

const StyledAside = styled.aside`
  flex: 0 0 240px;
  padding-top: 38px;
  text-align: center;
`;

const StyledList = styled.ul`
  padding: 0;
  list-style: none;

  li {
    display: flex;
  }

  a {
    display: flex;
    align-items: center;

    font:
      700 18px/17px 'EB Garamond',
      serif;
    color: black;

    text-decoration: none;

    &:hover svg {
      color: red;
    }
  }

  svg {
    flex: 0 0 24px;
    color: tomato;

    transition: all 0.5s ease-in-out;
  }

  span {
    flex: 0 0 auto;
    padding-left: 10px;
  }
`;

const StyledLogo = styled(Link)`
  display: inline-block;
  margin-bottom: 27px;
  color: black;
  text-align: center;
  text-decoration: none;

  &:hover svg {
    color: red;
  }

  span {
    font-weight: 700;
    font-size: 38px;
  }

  svg {
    max-width: 124px;
    margin-bottom: -2px;
    color: tomato;

    transition: all 0.5s ease-in-out;
  }
`;
