import React from 'react';
import { shape, string, number, instanceOf } from 'prop-types';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import Preview from './Preview';
import VolunteerButton from '../../Buttons/Volunteer';
import UserStore from '../../../stores/UserStore';
import ChatLink from '../../ChatLink';
import Link from '../../Link';

const StyledDiv = styled.div`
  min-width: 400px;
  min-height: 400px;
  border: 1px solid lightgray;
  flex: 1;
  margin: 8px 5px;
  position: relative;
`;

const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  font-family: ${props => props.theme.fontTwo};
  position: absolute;
  top: 50%;
  left: 0%;

  #project-title {
    font-weight: 800;
    font-size: .95em;
    text-decoration: underline;
    margin-bottom: 10px;
    font-family: ${props => props.theme.fontOne};
  }
`;

const VolunteerContainer = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const ProjectCard = ({ project, userStore: { currentUser, isAuthenticating } }) => (
  <StyledDiv>
    <Preview imgUrl={project.imgUrl} taskDescription={project.taskDescription} />
    <ProjectDetails>
      <span id="project-title">{project.name} </span>
      <span>By: {project.organizationName} </span>
      <span>Contact Person: <Link to={`/profile/${project.ownerId}`}>{project.organization.contactPerson} </Link> </span>
      <span>Contact #: {project.organization.phoneNumber} </span>
      <span>Slots left: {project.getRemainingSlots} </span>
      {
        (currentUser && currentUser.projectIds.includes(project._id)) &&
        <ChatLink projectId={project._id} />
      }
    </ProjectDetails>
    <VolunteerContainer>
      {
        !isAuthenticating &&
        <VolunteerButton
          to={`/project/${project._id}`}
          volunteered={currentUser && currentUser.projectIds.includes(project._id)}
        />
      }
    </VolunteerContainer>
  </StyledDiv >
);

ProjectCard.propTypes = {
  project: shape({
    imgUrl: string.isRequired,
    name: string.isRequired,
    organizationName: string,
    organization: shape({
      contactPerson: string,
      phoneNumber: string,
    }).isRequired,
    getRemainingSlots: number.isRequired,
  }).isRequired,
  userStore: instanceOf(UserStore).isRequired,
};

export default inject('userStore')(observer(ProjectCard));
