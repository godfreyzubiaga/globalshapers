import React from 'react';
import styled from 'styled-components';
import colors from '../../theme/constants';

const StyledDiv = styled.div`
  position: relative; 
  margin-bottom: 45px; 
  font-family: 'Open Sans', 'sans-serif';

  input {
    font-size: 17px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 285px;
    border: none;
    border-bottom: 1px solid #757575;
    background: none;
  }

  input:focus { outline:none; }

  label {
    color: #999; 
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all; 
    -moz-transition: 0.2s ease all; 
    -webkit-transition: 0.2s ease all;
  }

  input:focus ~ label, input:valid ~ label {
    top:-20px;
    font-size:14px;
    color: ${colors.secondary};
  }

  .bar { position:relative; display:block; width:300px; }
  .bar:before, .bar:after {
    content:'';
    height: 2px; 
    width: 0;
    bottom: 1px; 
    position: absolute;
    background: ${colors.secondary}; 
    transition: 0.2s ease all; 
    -moz-transition: 0.2s ease all; 
    -webkit-transition: 0.2s ease all;
  }
  .bar:before {
    left: 50%;
  }
  .bar:after {
    right: 50%; 
  }

  input:focus ~ .bar:before, input:focus ~ .bar:after {
    width: 50%;
  }

  .highlight {
    position: absolute;
    height: 60%; 
    width: 100px; 
    top: 25%; 
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }

  input:focus ~ .highlight {
    -webkit-animation:inputHighlighter 0.3s ease;
    -moz-animation:inputHighlighter 0.3s ease;
    animation:inputHighlighter 0.3s ease;
  }

  @-webkit-keyframes inputHighlighter {
    from { background:${colors.secondary}; }
    to { width:0; background:transparent; }
  }
  @-moz-keyframes inputHighlighter {
    from { background:${colors.secondary}; }
    to { width:0; background:transparent; }
  }
  @keyframes inputHighlighter {
    from { background:${colors.secondary}; }
    to { width:0; background:transparent; }
  }
`;

const Input = ({ label, onChange, type, id, required }) => (
  <StyledDiv>
    <input type={type} required={required} onChange={onChange} id={id} />
    <span className="highlight" />
    <span className="bar" />
    <label>{label}</label>
  </StyledDiv>
);

export default Input;