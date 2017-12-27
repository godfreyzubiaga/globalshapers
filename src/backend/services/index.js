import userService from './user';
import authentication from './authentication';
import projectService from './project';
import organizationService from './organization';
import postService from './post';
import userfollowerService from './userfollower';
import projectvolunteer from './projectvolunteer';

function services(db) {
  return function execute() {
    const app = this;

    app.configure(authentication());
    app.configure(userService(db));
    app.configure(projectService(db));
    app.configure(organizationService(db));
    app.configure(postService(db));
    app.configure(userfollowerService(db));
    app.configure(projectvolunteer(db));
  };
}

export default services;
