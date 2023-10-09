import axios from "axios";
import Notify from "../helpers/notify";
import useToken from './token';
const { getAccessToken, validateToken } = useToken();
export default function useApi() {
  const makeRequest = async (method: string, body = null, endpoint: string) => {
    try {
      await validateToken();
      const response = await fetch(`${import.meta.env.VITE_API_SHRIMP}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getAccessToken()
        },
        body: body ? JSON.stringify(body) : null
      });
      await checkResponse(response);
      const data = await response.json();
      return data;
    } catch (error: any) {
      Notify.error(error.message);
    }
  };

  async function getResource(endpoint: string) {
    return makeRequest('GET', null, endpoint);
  }

  async function postResource(endpoint: string, payload: any) {
    return makeRequest('POST', payload, endpoint);
  }

  async function patchResource(endpoint: string, payload: any) {
    return makeRequest('PATCH', payload, endpoint);
  }

  async function putResource(endpoint: string, payload: any) {
    return makeRequest('PUT', payload, endpoint);
  }

  async function deleteResource(endpoint: string) {
    return makeRequest('DELETE', null, endpoint);
  }

  async function graphqlQuery(query: string, variables?: any) {
    try {
      await validateToken();
      const response = await fetch(`${import.meta.env.VITE_API_SHRIMP}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getAccessToken()
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      });
      await checkResponse(response);
      const data = await response.json();
      return data;
    } catch (error: any) {
      Notify.error(error.message);
    }
  }

  async function checkResponse(response: any) {
    if (await response.ok === false) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message || 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async function postResourceFile(endpoint: string, method = 'POST', payload: any) {
    try {
      await validateToken();
      const formData = new FormData();

      for (const name in payload) {
        formData.append(name, payload[name]);
      }

      const response = await axios(`${import.meta.env.VITE_API_SHRIMP}/${endpoint}`, {
        method,
        headers: {
          'Authorization': 'Bearer ' + getAccessToken()
        },
        data: formData
      });
      await checkResponse(response);

      const data = await response.data;
      return data;
    } catch (error: any) {
      Notify.error(error.message);
    }
  }
  async function putResourceFile(endpoint: string, payload: any) {
    try {
      await validateToken();
      const formData = new FormData();
      for (const name in payload) {
        formData.append(name, payload[name]);
      }

      const response = await axios(`${import.meta.env.VITE_API_SHRIMP}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + getAccessToken(),
          'Content-Type': 'application/x-www-form-urlencoded' 
        },
        data: formData
      });

      await checkResponse(response);
      return await response.data;
    } catch (error: any) {
      Notify.error(error.message);
    }
  }


  return {
    getResource, postResource, putResource, deleteResource, checkResponse, graphqlQuery, postResourceFile, putResourceFile, patchResource
  };
}