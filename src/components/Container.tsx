import React from 'react';
import styled from 'styled-components';

export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
);

const StyledContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 60px;
`;
