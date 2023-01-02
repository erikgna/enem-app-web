import axios, { AxiosInstance } from "axios";
import { IFilters } from "../interface/Filter";
import { IAddQuestion, IQuestion } from "../interface/Question";
import { ILogin } from "../interface/User";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: { authorization: `Bearer ${document.cookie.replace("token=", "")}` },
});

export const getOne = (url: string) => api.get(`/questions/${url}`);
export const getOneRandomQuestion = (body: IFilters) =>
  api.post("/questions", body);

export const getHistory = () => api.get("/users/questions");

export const addQuestion = (body: IAddQuestion) =>
  api.patch("/users/new-question", body);

export const removeQuestion = (questionId: string) =>
  api.patch(`/users/remove-question/${questionId}`);

export const loginRoute = (body: ILogin) => api.post("/auth/login", body);

export default api;
