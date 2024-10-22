import { useContext } from "react";
import AuthContext from "./AuthContext";


export default function useTheme() {
  const consumer = useContext(AuthContext);
  
  if (!consumer) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return consumer;
}