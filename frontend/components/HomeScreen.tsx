"use client";
import {
  Menu,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedButton from "@/components/custom/AnimatedButton";
import NewsCard from "@/components/custom/NewsCard";
import LatestReportCard from "@/components/custom/LatestReportCard";
import StatCard from "@/components/custom/StatCard";
import SurvivorStory from "@/components/custom/SurvivorStory";
import SafetyApp from "@/components/custom/SafetyApp";

const NewsSection = () => {
  const stats = [
    {
      date: "August 27, 2021 - 10:48 am",
      title: "300 Women Just Came Forward About Their Harassment in Tech",
      description:
        "This is the story that isn’t being told, but needs to be. Women are being harassed in the tech sector at an alarming rate, and it isn’t being reported...",
    },
    {
      date: "August 27, 2021 - 08:35 am",
      title: "The Social-Media Stars Who Move Markets",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      date: "August 27, 2021 - 08:31 am",
      title: "Supreme Court Blocks New Eviction Moratorium",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <NewsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export default function LandingPage() {
  const currentDate = formatDate(new Date());

  return (
    <div className="min-h-screen bg-[#FEFDF5]">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-sm text-gray-600">{currentDate}</div>
            <div className="flex items-center gap-4">
              <AnimatedButton
                href="/auth/signup"
                className="px-2 py-2 text-red-600 transition-colors group"
              >
                Join as an Organization
              </AnimatedButton>
              <Link href="/report/listoforgs">
                <button className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors">
                  Report
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white flex flex-col min-h-screen border-b justify-center items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <img
            src="/sheshield-logo.jpg"
            className="w-48 h-auto mx-auto mb-8"
          />
          <h1 className="text-4xl md:text-6xl font-serif mb-16 text-[#222222]">
            Courage starts with a{" "}
            <AnimatedButton
              href="/auth/signup"
              className="px-2 py-2 text-red-600 transition-colors font-instrument-serif italic group"
            >
              report
            </AnimatedButton>
          </h1>

          <NewsSection />
          <div className="flex flex-col md:flex-row gap-6 mt-20 justify-center items-center">
            <div className="flex flex-col gap-6 w-full md:w-2/6">
              <StatCard
                number={63}
                description="of women don't report abuse due to fear of retaliation"
              />
              <StatCard
                number={48}
                description="remain silent due to shame and societal pressure"
              />
              <StatCard
                number={71}
                description="wish they had reported their first incident of abuse"
              />
            </div>
            <div className="flex flex-col gap-6 w-full md:w-4/6">
              <LatestReportCard />
            </div>
          </div>
        </div>
      </header>

      {/* Survivor Stories Section */}
      <section className="bg-white border-b transition-colors duration-500 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <p className="text-2xl md:text-5xl font-serif text-[#222222]">
              Survivor
              <AnimatedButton className="px-2 py-2 text-red-600 transition-colors font-instrument-serif italic group">
                Stories
              </AnimatedButton>
            </p>
            <button className="bg-red-600 text-white px-6 py-2 hover:bg-red-700 transition-colors">
              Share Your Story
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            <SurvivorStory
              name="Breaking the Silence"
              date="February 20, 2025"
              excerpt="After years of domestic abuse, finding the courage to speak up changed everything..."
              image="/story1.jpg"
            />
            <SurvivorStory
              name="Finding Strength in Community"
              date="February 18, 2025"
              excerpt="When I shared my story, I discovered I wasn't alone. The support I received..."
              image="/story2.jpg"
            />
            <SurvivorStory
              name="A Journey to Healing"
              date="February 15, 2025"
              excerpt="Recovery isn't linear. Each day brings new challenges and victories..."
              image="/story3.jpg"
            />
            <SurvivorStory
              name="Voice of Change"
              date="February 12, 2025"
              excerpt="My report led to policy changes in workplace harassment protocols..."
              image="/story4.jpg"
            />
          </div>
        </div>
      </section>

      {/* Safety Apps Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-2xl md:text-5xl font-serif text-[#222222]">
            Safety
            <AnimatedButton className="px-2 py-2 text-red-600 transition-colors font-instrument-serif italic group">
              Resources
            </AnimatedButton>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SafetyApp
              title="SafeWalk"
              description="GPS tracking app that allows trusted contacts to monitor your journey in real-time."
              link="#"
            />
            <SafetyApp
              title="SupportCircle"
              description="Connect with counselors and support groups anonymously, 24/7."
              link="#"
            />
            <SafetyApp
              title="LegalAid"
              description="Free legal resources and guidance for survivors of abuse."
              link="#"
            />
            <SafetyApp
              title="SafeWalk"
              description="GPS tracking app that allows trusted contacts to monitor your journey in real-time."
              link="#"
            />
            <SafetyApp
              title="SupportCircle"
              description="Connect with counselors and support groups anonymously, 24/7."
              link="#"
            />
            <SafetyApp
              title="LegalAid"
              description="Free legal resources and guidance for survivors of abuse."
              link="#"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-lg font-serif mb-4">Emergency Contacts</h3>
              <div className="text-3xl font-bold text-red-600 mb-2">
                1-800-SAFE-NOW
              </div>
              <p className="text-sm text-gray-600">
                24/7 Confidential Support Available
              </p>
            </div>

            <div>
              <h3 className="text-lg font-serif mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Report Abuse
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Find Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Legal Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Safety Tips
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-serif mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}