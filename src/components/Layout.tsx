import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from './Container';
import { Aside } from './Aside';
import styled from 'styled-components';
import { Loader } from './Loader';

export const Layout = () => {
  return (
    <main>
      <Container>
        <StyledInner>
          <Aside />
          <StyledCont>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </StyledCont>
        </StyledInner>
      </Container>
    </main>
  );
};

const StyledInner = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledCont = styled.div`
  flex: 1 1 100%;
  padding: 60px 0 60px 60px;
`;
