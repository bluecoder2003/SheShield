
import HomeScreen from "@/components/HomeScreen";
import { AuthProvider } from "@/Context/Authcontext";
import React from "react";

export default function Home() {
  return (
    <AuthProvider>
      <main className="flex flex-col gap-4 ">
      <HomeScreen />
    </main>
    </AuthProvider>
    
  );
}
