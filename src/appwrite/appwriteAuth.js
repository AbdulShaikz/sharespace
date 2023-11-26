import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Error while creating account: ", error);
      throw error;
    }
  }

  async sendVerificationEmail(url){
    try {
      return await this.account.createVerification(url);
    } catch (error) {
      console.log("Error while sending verification mail to your email: ", error);
    }
  }

  async confirmVerification(userId, token){
    try {
      return await this.account.updateVerification(userId,token);
    } catch (error) {
      console.log("Error while sending verification mail to your email: ", error);
      throw error;
    }
  }

  async resetPasswordLink(email, url){
    try {
      return await this.account.createRecovery(email,url);
    } catch (error) {
      console.log("Error while sending resetpassword link: ", error);
      throw error;
    }
  }

  async resetPassword(userId, secret, password, confirmPassword){
    try {
      return await this.account.updateRecovery(userId, secret, password, confirmPassword);
    } catch (error) {
      console.log("Error while resetting password: ", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Error while signing in: ", error);
      throw error;
    }
  }

  siginWithGoogle(google,success,failure){
    try {
      return this.account.createOAuth2Session('google',success,failure)
    } catch (error) {
      console.log("Error while signing in with google: ", error);
      throw error;
    }
  }

  async googleSession(){
    try {
      return await this.account.getSession('current');
    } catch (error) {
      console.log("Error while completing google sign in session: ", error);
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error while getting the current user: ", error);
      //throw error;
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Error while signing out: ", error);
      throw error;
    }

    return null;
  }
}

const appwriteAuthService = new AuthService();

export default appwriteAuthService;
