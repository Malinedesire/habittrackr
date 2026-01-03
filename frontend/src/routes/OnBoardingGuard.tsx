import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const OnboardingGuard = ({ children }: Props) => {
  const hasCompletedOnboarding =
    localStorage.getItem("onboardingCompleted") === "true";

  if (hasCompletedOnboarding) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default OnboardingGuard;