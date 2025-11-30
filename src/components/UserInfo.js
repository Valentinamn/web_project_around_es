export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._aboutEl = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      name: this._nameEl ? this._nameEl.textContent : "",
      about: this._aboutEl ? this._aboutEl.textContent : "",
    };
  }

  setUserInfo({ name, about }) {
    if (this._nameEl && typeof name === "string")
      this._nameEl.textContent = name;
    if (this._aboutEl && typeof about === "string")
      this._aboutEl.textContent = about;
  }
}
