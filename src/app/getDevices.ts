/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { apiHost } from './helper';

const getDevices = (callback) => {
  axios
    .get(`${apiHost}/data.json`)
    .then((response) => response.data)
    .then((data) => {
      callback(data);
      //   setDeviceData(data);
      //   setIsLoading(false);
      //   if (deviceDetail !== null) {
      //     const selected = data.find((device) => device.uuid === deviceDetail.uuid);
      //     if (selected) {
      //       setDeviceDetail(selected);
      //     }
      //   }
    });
};

export default getDevices;
