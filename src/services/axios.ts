import axios, { AxiosResponse } from "axios";
import { ISignUp } from "@repo/types/signUp";

class Axios {
    public signUp = (user: ISignUp): Promise<string> => {
        return axios.post<string>('http://localhost:5555/auth/registration', user).then((response) => response.data);
    }
    public signIn= (user: ISignUp): Promise<string> => {
        return axios.post<string>('http://localhost:5555/auth/login', user).then((response) => response.data)
    }
}

export const signUpService = new Axios();
