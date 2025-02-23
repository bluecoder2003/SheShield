"use client";
import {
  Menu,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Github,
  Quote
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
      date: "August 27, 2024 - 10:48 am",
      title: "300 Women Just Came Forward About Their Harassment in Tech",
      description:
        "This is the story that isn’t being told, but needs to be. Women are being harassed in the tech sector at an alarming rate, and it isn’t being reported...",
      link: "https://radcampaign.com/blog/300-women-just-came-forward-about-their-harassment-tech"
    },
    {
      date: "August 27, 2024 - 08:35 am",
      title: "Empower Yourself Against Workplace Toxicity",
      description:
        "Statistics show that millions of employees across America will be impacted by harassment and discrimination at some point in their career. These experiences leave many feeling isolated and alone, yet there is a massive...",
      link: "https://www.betterbrave.org/"
    },
    {
      date: "August 27, 2024 - 08:31 am",
      title: "Tech-based sexual harrasment at work is common",
      description:
        "From inappropriate messages to online stalking, technology is increasingly being used as a tool for workplace harassment. Recognizing and addressing these issues is crucial to creating a safer work environment...",
      link: "https://hr.economictimes.indiatimes.com/news/workplace-4-0/tech-based-sexual-harassment-at-work-is-common-male-dominated-and-often-intended-to-cause-harm/109753120"
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
    <motion.div
      className="min-h-screen bg-[#FEFDF5]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Navigation */}
      <motion.nav
        className="border-b bg-white sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="hidden md:block text-sm text-gray-600">{currentDate}</div>
            <div className="flex items-center justify-between w-full md:w-auto gap-0 md:gap-4">
              <AnimatedButton
                href="/auth/signup"
                className="px-2 py-2 text-red-600 transition-colors group"
              >
                Join as an Organization
              </AnimatedButton>
              <Link href="/report/listoforgs">
                <button className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors ml-auto md:ml-0">
                  Report
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.header
        className="bg-white flex flex-col min-h-screen border-b justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <img
            src="/sheshield-logo.jpg"
            className="w-48 h-auto mx-auto mb-8"
          />
          <div className="flex flex-col items-center justify-center mb-14">
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-[#222222]">
              Courage starts with a{" "}
              <AnimatedButton
                href="/auth/signup"
                className="px-2 py-2 text-red-600 transition-colors font-instrument-serif italic group"
              >
                report
              </AnimatedButton>
            </h1>
            <div className="flex flex-row gap-0 md:gap-2 px-4">
              <Quote className="text-red-600 transform scale-x-[-1] size-4" />
              <p className="px-2 py-2 text-red-600 transition-colors font-instrument-serif italic group">Report anonymously. Break the silence, not your privacy.</p>
              <Quote className="text-red-600 size-4" />
            </div>
          </div>

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
      </motion.header>

      {/* Survivor Stories Section */}
      <motion.section
        id="survivor stories"
        className="bg-white border-b transition-colors duration-500 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <p className="text-2xl md:text-5xl font-serif text-[#222222]">
              Survivor
              <AnimatedButton className="px-2 py-2 text-red-600 transition-colors font-instrument-serif italic group">
                Stories
              </AnimatedButton>
            </p>
            <button className="bg-red-600 text-white px-6 py-2 hover:bg-red-700 transition-colors mt-4 md:mt-0">
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
      </motion.section>

      {/* Safety Apps Section */}
      <motion.section
        id="safety resources"
        className="bg-white border-b"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-2xl md:text-5xl font-serif text-[#222222] text-center md:text-left">
            Safety
            <AnimatedButton className="px-2 py-2 text-red-600 transition-colors font-instrument-serif italic group">
              Resources
            </AnimatedButton>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SafetyApp
              title="112 India"
              description="The Indian government launched the 112 India app for women's safety, enabling SOS alerts with a single tap. Available on Android and iOS across 23 states and UTs, it provides a single emergency number for women in distress. Simple to use after registration, it's one of the best safety apps today."
              link="https://112.gov.in/"
            />
            <SafetyApp
              title="My Safetipin"
              description="My Safetipin is another of the best safety apps for women’s security. This application employs data mapping techniques to help women feel secure in public places, its goal is to make cities safer by making data available to consumers via technological tools and applications."
              link="https://safetipin.com/"
            />
            <SafetyApp
              title="bSafe"
              description="New Smart Technology That Saves Lives On track to become a world-leading provider of safety and security solutions."
              link="https://www.getbsafe.com/"
            />
            <SafetyApp
              title="Smart 24×7"
              description="This is the best safety app for women that stands out from the crowd. It’s a one-of-a-kind software that allows a person in distress to communicate with loved ones while also receiving quick support from a 24-hour customer service centre."
              link="https://smart24x7.com/"
            />
            <SafetyApp
              title="Shake2Safety"
              description="Shake2Safety is again one of the best women’s safety apps in India. This app has a very user-friendly interface and can be used in case of an accident, harassment, robbery or any natural calamities."
              link="https://shake2safety-personal-safety.en.softonic.com/android"
            />
            <SafetyApp
              title="SHe-Box"
              description="Sexual Harassment electronic Box (SHe-Box) is an effort of GoI to provide a single window access to every woman, irrespective of her work status, whether working in organised or unorganised, private or public sector, to facilitate the registration of complaint related to sexual harassment. Any woman facing sexual harassment at workplace can register their complaint through this portal."
              link="https://shebox.wcd.gov.in/#"
            />
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-white border-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-lg font-serif text-gray-500 mb-4">Emergency Contacts</h3>
              <div className="text-3xl font-bold text-red-600 mb-2">
                1-800-SAFE-NOW
              </div>
              <p className="text-sm text-gray-600">
                24/7 Confidential Support Available
              </p>
            </div>

            <div>
              <h3 className="text-lg font-serif mb-4 text-gray-500">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="/report/listoforgs" className="hover:text-red-700">
                    Report Abuse
                  </a>
                </li>
                <li>
                  <a href="/auth/signup" className="hover:text-red-700">
                    Join as an Organization
                  </a>
                </li>
                <li>
                  <a href="#survivor stories" className="hover:text-red-700">
                    Survivor Stories
                  </a>
                </li>
                <li>
                  <a href="#safety resources" className="hover:text-red-700">
                    Safety Resources
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-serif mb-4 text-gray-500">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://github.com/LoadingMinds" className="text-gray-600 hover:text-red-700">
                  <Github className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/loadingminds/" className="text-gray-600 hover:text-red-700">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="mailto:LoadingMinds@gmail.com" className="text-gray-600 hover:text-red-700">
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}