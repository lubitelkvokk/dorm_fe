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
      throw new Error(`GET ${url} failed: ${response.statusText}`);
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
      throw new Error(`POST ${url} failed: ${response.statusText}`);
    }
    return response;
  },

  // Other HTTP methods (PUT, DELETE) can be added here.
};
