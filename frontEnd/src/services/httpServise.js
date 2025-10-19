import axios from "axios";
import { url } from "../../config.json";

// הגדרת הכתובת הראשית לכתובת פורט המקומי
axios.defaults.baseURL = url;

export const httpserviseObj = {
  get: axios.get,
  post: axios.post,
};
