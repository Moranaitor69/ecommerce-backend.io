export default class UserCurrentDTO {
  constructor(user) {
    this.id = user._id;
    this.email = user.email;
    this.role = user.role;
  }
}