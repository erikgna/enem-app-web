import axios, { AxiosInstance } from "axios";
import { IFilters } from "../interface/Filter";
import { IAddQuestion } from "../interface/Question";
import { IReport } from "../interface/Report";
import { ILogin, IRegister } from "../interface/User";

const token = document.cookie
  .split(";")
  .find((item) => item.includes("unsolved-token="))
  ?.replace("unsolved-token=", "");

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  // baseURL: "https://enem-popvpucinq-vp.a.run.app/api/v1",
  headers: { authorization: `Bearer ${token}` },
});

export const getOne = (url: string) => api.get(`/questions/${url}`);
export const getOneRandomQuestion = (body: IFilters) =>
  api.post("/questions", body);

export const getHistory = () => api.get("/users/questions");

export const addQuestion = (body: IAddQuestion) =>
  api.patch("/users/new-question", body);

export const eraseHistory = () => api.delete("/users/erase-history");

export const loginRoute = (body: ILogin) => api.post("/auth/login", body);
export const registerRoute = (body: IRegister) => api.post("/users", body);

export const postReport = (body: IReport) => api.post("/report", body);

export default api;
