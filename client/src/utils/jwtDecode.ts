import { jwtDecode, type JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload{
   user?:{
      id: number,
      fullName: string,
      email: string
   },
   exp: number;
}

export const decodeToken = (token: string) => {
   try{
      const decoded = jwtDecode<DecodedToken>(token);
      const userId = decoded.user?.id;
      const fullname = decoded.user?.fullName;
      const email = decoded.user?.email;
      const expiration = decoded.exp;

      return {userId, fullname, email, expiration};
   } catch(e) {
      console.log("Error decoding token", e)
      return null;
   }
}

export const getUserId = () => {
   const token = localStorage.getItem("token");
   if (!token) return;
   
   const {userId} = decodeToken(token) || {};
   return userId;
}