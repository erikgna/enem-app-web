import axios, { AxiosInstance } from "axios";
import { IFilters } from "../interface/Filter";
import { ILogin } from "../interface/User";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: { authorization: `Bearer ${document.cookie.replace("token=", "")}` },
});

export const getOne = (url: string) => api.get(`/questions/${url}`);
export const getOneRandomQuestion = (body: IFilters) =>
  api.post("/questions", body);

export const loginRoute = (body: ILogin) => api.post("/auth/login", body);

export default api;
