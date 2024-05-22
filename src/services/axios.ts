import axios, { AxiosResponse } from "axios";
import { ISignUp } from "@repo/types/signUp";
import {IResponseToken} from "@repo/types/responseToken";

class Axios {
    public signUp = (user: ISignUp): Promise<IResponseToken> => {
        return axios.post<IResponseToken>('http://localhost:5555/auth/registration', user).then((response) => response.data);
    }
    public signIn= (user: ISignUp): Promise<IResponseToken> => {
        return axios.post<IResponseToken>('http://localhost:5555/auth/login', user).then((response) => response.data)
    }
}

export const signUpService = new Axios();
