import axios from 'axios';
import { BACKENDURL } from '../constants/Backend.js';
import { retrieveNumber } from './storage';

export const fetchPositionAPI = async () => {
  const { hisownnumber } = await retrieveNumber();
  return axios
    .get(
      `${BACKENDURL}/waitlist/position-in-queue?hisownnumber=${hisownnumber}`
    )
    .then((response) => {
      return response.data;
    });
};

export const postShareGenerated = async (data) => {
  const { hisownnumber } = await retrieveNumber();
  return axios
    .post(
      `${BACKENDURL}/waitlist/log-share-generated`,
      { hisownnumber },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((resp) => {
      console.log('postCreateOrder', resp.data);
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};
export const postToWaitlist = async (data) => {
  // console.log("data post create", data);
  return axios
    .post(`${BACKENDURL}/waitlist/add-to-waitlist`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((resp) => {
      console.log('postCreateOrder', resp.data);
      return resp.data;
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};
