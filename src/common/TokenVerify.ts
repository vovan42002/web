import { isExpired, decodeToken } from "react-jwt";

export const isTokenExpired = (token: string) => {
    return isExpired(token);
};