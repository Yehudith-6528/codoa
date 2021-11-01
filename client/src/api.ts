import axios from "axios";
const APIRootPath = "http://localhost:3232/api/tickets";

export type Ticket = {
  id: string;
  title: string;
  content: string;
  creationTime: number;
  userEmail: string;
  labels?: string[];
};

export type ApiClient = {
  getTickets: (searchTxt: String) => Promise<Ticket[]>;
};

export const createApiClient = (): ApiClient => {
  return {
    getTickets: (searchTxt) => {
      if (searchTxt) {
        return axios
          .get(APIRootPath + `?search=${searchTxt.toLowerCase()}`)
          .then((res) => res.data);
      } else return axios.get(APIRootPath).then((res) => res.data);
    },
  };
};
