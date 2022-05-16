export class UserPasswordDTO {
  oldPassword?: string;
  newPassword?: string;
  checkPassword?: string;
  constructor(oldPassword?: string, newPassword?: string, checkPassword?: string) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    this.checkPassword = checkPassword;
  }
}
