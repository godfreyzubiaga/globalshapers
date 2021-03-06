import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import { limitWordCount } from '../../../../utils';

const StyledDiv = styled.div`
  height: 50%;
  color: gray;
  cursor: pointer;   
  overflow: hidden;
  width: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
`;

const ProjectImg = styled.img`
  transition: 0.3s;
  transform: ${props => props.hovered && 'scale(1.2)'};
  background-img: url(${props => props.src && props.src});
  background-position: 50% 50% !important;
`;

const ProposalContainer = styled.div`
  z-index: 999; 
  position: absolute;
  width: inherit;
  background: rgba(0,0,0,0.7);
  padding: 20px;
  height: 160px;
  color: lightgray;
  font-family: ${props => props.theme.fontTwo};
  display: ${props => (props.show ? 'block' : 'none')};
`;

class Preview extends React.Component {
  static propTypes = {
    taskDescription: string.isRequired,
    imgUrl: string.isRequired,
  };

  static defaultProps = {
    taskDescription: '',
    imgUrl: '',
  };

  state = { isHovered: false };

  onMouseLeave = () => {
    this.setState({ isHovered: false });
  }

  onMouseEnter = () => {
    this.setState({ isHovered: true });
  }

  render() {
    const { taskDescription, imgUrl } = this.props;
    return (
      <StyledDiv onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <ProposalContainer show={this.state.isHovered}>
          <span> {limitWordCount(20, taskDescription)}... </span>
        </ProposalContainer>
        <ProjectImg src={imgUrl} alt="project" hovered={this.state.isHovered} />
      </StyledDiv>
    );
  }
}

export default Preview;
