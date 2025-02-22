import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-purple-700 text-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Shield size={24} />
              <span className="text-xl font-bold">SheShield</span>
            </div>
          </Link>
          <Link href="/auth/login">
            <button className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold 
              hover:bg-purple-100 transition-colors">
              login
            </button>
          </Link>
          <Link href="/auth/signup">
            <button className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold 
              hover:bg-purple-100 transition-colors">
              Signup
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-purple-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Empowering Workplaces, Protecting Voices
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-2xl mx-auto">
            A secure and confidential platform for reporting workplace harassment. 
            Your safety matters, and we're here to support you.
          </p>
          <Link href="/report">
            <button className="bg-white text-purple-700 px-8 py-3 rounded-lg text-lg 
              font-semibold hover:bg-purple-100 transition-colors">
              Report an Incident
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          How SheShield Helps
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Secure & Anonymous</h3>
            <p className="text-gray-600">
              Your reports are protected with blockchain technology, ensuring complete 
              privacy and security.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Easy Reporting</h3>
            <p className="text-gray-600">
              Simple step-by-step process to document and report incidents with 
              supporting evidence.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Support Network</h3>
            <p className="text-gray-600">
              Connect with HR representatives and support resources through a secure 
              channel.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Action?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Don't let workplace harassment go unreported. Take the first step towards 
            creating a safer workplace environment.
          </p>
          <Link href="/report">
            <button className="bg-purple-700 text-white px-8 py-3 rounded-lg text-lg 
              font-semibold hover:bg-purple-800 transition-colors">
              File a Report
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>© {new Date().getFullYear()} SheShield. All rights reserved.</p>
          <p className="mt-2">
            For immediate assistance, contact your HR department or local authorities.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;