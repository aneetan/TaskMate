import { createContext, useState, type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { refreshTokenAPI } from "../api/userApi";

interface AuthContextProps {
   token: string | null;
   userId: number | null;
   login: (token: string, userId: number) => void;
   logout: () => void;
   isAuthenticated: boolean;
   refreshAccessToken: (userId: number) => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
   const [token, setToken] = useState<string | null>(null);
   const [userId, setUserId] = useState<number | null>(null);
   const queryClient = useQueryClient();

   const login = (newToken: string, newUserId: number) => {
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUserId(newUserId);
   }

   const logout = () => {
      localStorage.removeItem("token");
      setToken(null);
      setUserId(null);
   }

   const isAuthenticated = !!token;

   const refreshTokenMutation = useMutation({
      mutationFn: refreshTokenAPI,
      onSuccess: (newAccessToken) => {
         localStorage.setItem("token", newAccessToken);
         setToken(newAccessToken);
         
         // Invalidate any queries that depend on user
         queryClient.invalidateQueries({ 
            queryKey: ['user', userId],
            exact: true 
         });
      },
      onError: (error) => {
         console.error('Token refresh failed:', error);
         logout();
      }
   })

   const refreshAccessToken = async (userId: number): Promise<string | null> => {
      const newToken = await refreshTokenMutation.mutateAsync(userId);
      return newToken;
   }; 

   const value: AuthContextProps = {
      token,
      userId,
      login,
      logout,
      isAuthenticated,
      refreshAccessToken
   }

   return(
      <AuthContext.Provider value={value}>
         {children}
      </AuthContext.Provider>
   )
}