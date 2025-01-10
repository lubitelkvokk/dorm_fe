import { useAuth } from "./AuthService";
import { Navigate } from "react-router-dom";
function ProtectedRouter({ children }) {
    const { isAuthenticated } = useAuth();
    // let isAuthenticated = true;
    console.log("ProtectedRoute isAuthenticated:", isAuthenticated);
    
    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }
  
    if (!isAuthenticated) {
      console.log("Redirecting to login...");
      return <Navigate to="/login" />;
    }
  
    return children;
  }

export default ProtectedRouter;
  