import React from 'react';
import styled from 'styled-components';
import { instanceOf } from 'prop-types';
import { ProgressBar } from 'reprogressbars';
import { observer, inject } from 'mobx-react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import LandingPage from './LandingPage/LandingPage';
import Signin from './Signin/Signin';
import Signup from './Signup/Signup';
import ProjectsPage from './ProjectsPage/ProjectsPage';
import ProjectOrganize from './ProjectOrganize/ProjectOrganize';
import Admin from './Admin/Admin';
import ViewStore from '../stores/ViewStore';
import UserStore from '../stores/UserStore';

const Grid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 100px 1fr 125px;
  grid-template-areas: 
  "progress"
  "header"
  "section"
  "footer"    
`;

const Section = styled.div`
  grid-area: section;
`;

const ProgressBarContainer = styled.div`
  grid-area: progress;
`;

class App extends React.Component {
  static propTypes = {
    viewStore: instanceOf(ViewStore).isRequired,
    userStore: instanceOf(UserStore).isRequired,
  };

  componentDidMount() {
    const { userStore } = this.props;
    userStore.authenticate();
  }

  render() {
    const { viewStore } = this.props;
    return (
      <Router>
        <Grid>
          <ProgressBarContainer>
            <ProgressBar isLoading={viewStore.isLoading} color={'#07d'} height="1.5px" />
          </ProgressBarContainer>
          <Header />
          <Section>
            <Route exact path="/" component={LandingPage} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/projects" component={ProjectsPage} />
            <Route path="/organize" component={ProjectOrganize} />
            <Route path="/admin" component={Admin} />
          </Section>
          <Footer />
        </Grid>
      </Router>
    );
  }
}

export default inject('viewStore', 'userStore')(observer(App));
