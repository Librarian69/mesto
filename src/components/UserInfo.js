export default class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      aboutUser: this._userInfo.textContent,
    };
  }

  setUserInfo(data) {
    this._userName.textContent = data.name ? data.name : "";
    this._userInfo.textContent = data.about ? data.about : "";
    this._avatar.src = data.avatar ? data.avatar : "";
    this._userId = data._id;
  }

  getUserId() {
    return this._userId;
  }
}
