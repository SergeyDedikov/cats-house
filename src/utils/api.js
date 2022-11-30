// Public API
const BASE_URL_API = "https://api.thecatapi.com/v1/images/search";
const API_KEY = "6ce97757-eab3-47e6-b462-e1f680e85366";

class Api {
  constructor(url, apiKey) {
    this._url = url;
    this._headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    };
  }

  _checkResult = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((data) => {
        const message = data.message || "Что-то пошло не так!";
        return Promise.reject(message);
      });
    }
  };

  getData() {
    return fetch(`${this._url}?limit=25&page=1&order=ASC&size=small`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResult);
  }

  addMoreData(page) {
    return fetch(`${this._url}?limit=25&page=${page}&order=ASC&size=small`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResult);
  }
}

const api = new Api(BASE_URL_API, API_KEY);

export default api;
