const baseUrl = "http://localhost:8080/";

export const apiService = {
  createAuthHeader(username, password) {
    const encodedCredentials = btoa(`${username}:${password}`);
    return { Authorization: `Basic ${encodedCredentials}` };
  },

  async get(url, headers = {}) {
    const authHeaders = JSON.parse(localStorage.getItem("authHeaders")) || {};
    const response = await fetch(baseUrl + url, { 
      method: 'GET', 
      headers: { ...authHeaders, ...headers } 
    });
    if (!response.ok) {
      let error_msg = await response.text();
      throw new Error(`GET ${url} failed: ${error_msg}`);
    }
    return response.json();
  },

  async post(url, data, headers = {}) {
    const authHeaders = JSON.parse(localStorage.getItem("authHeaders")) || {};
    const response = await fetch(baseUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...headers,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.log(response);
      let error_msg = await response.text();
      console.log(error_msg);
      throw new Error(`POST ${url} failed: ${error_msg}`);
    }
    return response;
  },

  async put(url, data, headers = {}) {
    const authHeaders = JSON.parse(localStorage.getItem("authHeaders")) || {};
    const response = await fetch(baseUrl + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...headers,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      let error_msg = await response.text();
      throw new Error(`PUT ${url} failed: ${error_msg}`);
    }
    return response;
  },
  // Other HTTP methods (PUT, DELETE) can be added here.
};
