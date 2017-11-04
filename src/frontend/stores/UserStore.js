import { observable, action, runInAction } from 'mobx';

const initialErrorState = {
  username: '', password: '', email: '',
  fullName: '', birthDay: '', addres: '',
  phoneNumber: '', occupation: '', affiliation: ''
}

class UserStore {
  @observable currentUser;
  @observable users = [];
  @observable authenticated;
  @observable signinInput = {};
  @observable signupInput = {};
  @observable signupSuccess;
  @observable signupErrorMsg = initialErrorState;
  @observable signinErrorMsg;
  @observable isAuthenticating = false;

  constructor(store, client) {
    this.store = store;
    this.client = client;
    this.setIsLoading = store.viewStore.setIsLoading;
  }

  @action.bound async authenticate() {
    try {
      runInAction(() => { this.isAuthenticating = true; this.setIsLoading(true) });
      const token = await this.client.authenticate();
      const payload = await this.client.passport.verifyJWT(token.accessToken);
      const user = await this.client.service('api/users').get(payload.userId);
      runInAction(() => {
        this.currentUser = user;
        this.authenticated = true;
        this.isAuthenticating = false;
        this.setIsLoading(false);
      });
    } catch (e) {
      runInAction(() => { this.isAuthenticating = false; this.setIsLoading(false); });
    }
  }

  @action.bound async login() {
    try {
      this.setIsLoading(true)
      const token = await this.client.authenticate({
        username: this.signinInput.username,
        password: this.signinInput.password,
        strategy: 'local',
      });
      const payload = await this.client.passport.verifyJWT(token.accessToken);
      const user = await this.client.service('api/users').get(payload.userId);
      runInAction(() => {
        this.currentUser = user;
        this.authenticated = true;
        this.setIsLoading(false);
      });
    } catch (e) {
      runInAction(() => {
        this.signinErrorMsg = 'Invalid login or password';
        this.setIsLoading(false);
      });
    }
  }

  @action.bound async signup() {
    try {
      runInAction(() => {
        this.signupErrorMsg = initialErrorState;
        this.setIsLoading(true);
      });
      const user = await this.client.service('api/users').create(this.signupInput);
      runInAction(() => {
        this.signupSuccess = true;
        this.signupInput = undefined;
        this.setIsLoading(false);
      });
    } catch (e) {
      runInAction(() => {
        const key = e.details[0].context.key;
        const message = e.details[0].message;
        this.signupErrorMsg[key] = message;
        this.setIsLoading(false);
      });
    }
  }

  @action.bound async logout() {
    try {
      this.setIsLoading(true);
      await this.client.logout();
      runInAction(() => { this.authenticated = false; this.setIsLoading(false) });
    } catch (e) {
      this.setIsLoading(false);
      console.log(e);
    }
  }

  @action.bound onSigninInput(e) {
    this.signinErrorMsg = '';
    this.signinInput[e.target.id] = e.target.value;
  }

  @action.bound onSignupInput(e) {
    this.signupErrorMsg = ''
    this.signupInput[e.target.id] = e.target.value;
  }

  @action.bound async fetchUsers() {
    try {
      const users = await this.client.service('api/users').find();
      runInAction(() => { this.users = users; });
    } catch (e) {
      console.log(e);
    }
  }
}

export default UserStore;
