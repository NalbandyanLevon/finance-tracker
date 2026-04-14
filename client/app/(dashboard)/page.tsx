"use client";

import ProtectedRoute from "@/shared/ui/ProtectedRoute";

import Dashboard from "@/components/Dashboard/Dashboard";

const Page = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
};

export default Page;
