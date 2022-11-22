import React from 'react'
import styled from 'styled-components'

export const Loader = () => (
  <StyledLoader>
    <div />
  </StyledLoader>
)

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;

  div {
    --clock-color: tomato;
    --clock-width: 50px;
    --clock-radius: calc(var(--clock-width) / 2);
    --clock-minute-length: calc(var(--clock-width) * 0.4);
    --clock-hour-length: calc(var(--clock-width) * 0.2);
    --clock-thickness: 0.2rem;

    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--clock-width);
    height: var(--clock-width);

    border: 3px solid var(--clock-color);
    border-radius: 50%;

    &::before,
    &::after {
      position: absolute;
      content: '';
      top: calc(var(--clock-radius) * 0.25);

      width: var(--clock-thickness);

      background: var(--clock-color);
      border-radius: 10px;

      transform-origin: center calc(100% - calc(var(--clock-thickness) / 2));
      animation: spin infinite linear;
    }

    &::before {
      height: var(--clock-minute-length);
      animation-duration: 2s;
    }

    &::after {
      top: calc(var(--clock-radius) * 0.25 + var(--clock-hour-length));
      height: var(--clock-hour-length);
      animation-duration: 15s;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
`
