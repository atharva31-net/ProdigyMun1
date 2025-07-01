import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import RegistrationForm from "@/components/registration-form";
import AdminLogin from "@/components/admin-login";

export default function Home() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  return (
    <div className="min-h-screen bg-background-page">
      {/* Navigation */}
      <nav className="surface shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-primary">Prodigy MUN 2024</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setShowAdminLogin(true)}
                className="text-gray-600 hover:text-primary"
              >
                <Shield className="mr-2 h-4 w-4" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="surface rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 sm:h-80">
            <img
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
              alt="MUN Conference Hall"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Prodigy MUN 2024</h1>
                <p className="text-xl md:text-2xl font-medium">Delegate Registration Portal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <RegistrationForm />
      </main>

      {/* Admin Login Modal */}
      <AdminLogin open={showAdminLogin} onOpenChange={setShowAdminLogin} />
    </div>
  );
}
