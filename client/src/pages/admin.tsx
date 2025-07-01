import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation } from "wouter";
import AdminDashboard from "@/components/admin-dashboard";

export default function Admin() {
  const [, setLocation] = useLocation();

  // Check if user is authenticated (in production, check JWT token)
  const isAuthenticated = sessionStorage.getItem("admin_authenticated") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return <AdminDashboard />;
}
