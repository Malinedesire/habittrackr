import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { auth } from "../firebase";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;