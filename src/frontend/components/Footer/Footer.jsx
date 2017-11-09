import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import media from '../../assets/theme/media';
import Nav from './Nav';
import Social from './Social';

const StyledDiv = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-items: center;
  background: ${props => props.theme.footer};

  ${media.tablet`
    flex-direction: column;
    height: 400px;
  `} 

  ${media.phone`
    height: 375px;
  `}
`;

const Container = styled.div`
  width: 370px;
  font-size: 15px;

  h3 {
    margin: 0px;
    color: ${props => props.theme.secondary}
  }

  ${media.tablet`
    text-align: center;
  `}

  ${media.phone`
    width: 300px;
  `}
`;

const Footer = ({ location }) => (
  <div>
    {
      location.pathname !== '/signup' &&
      <StyledDiv>
        <Nav />
        <Container>
          <h3> Global Shapers Iloilo © </h3>
          <p> The Global Shapers Community is a network of young people driving dialogue, action and change. </p>
        </Container>
        <Social />
      </StyledDiv>
    }
  </div>
);

export default withRouter(Footer);