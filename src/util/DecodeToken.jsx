import { jwtDecode } from "jwt-decode";
export const TokenDecoder = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const decodedToken = jwtDecode(user?.token.toString());
    return decodedToken;
};