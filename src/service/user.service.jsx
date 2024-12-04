import api from "../helper/request";

const login = (obj) => api.post("/login/", obj);

export { login };
