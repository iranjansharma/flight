"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import FlightSearchForm from "./Flight";

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) return null;

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-white to-white -z-10"></div>
      <div className="container relative max-w-8xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left content */}
        <div className="space-y-6 z-10">
          <button className="inline-flex items-center bg-yellow-300 text-black font-semibold px-5 py-2 rounded-full shadow hover:bg-yellow-400 transition">
            🌍 Explore the World
          </button>

          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Unveil the Beauty <br />
            of the World Every Day
          </h1>
          <p className="text-gray-500 text-lg">
            Travel Without Limits Browse, Book, Explore
          </p>

          {/* Tabs */}
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
            <div className="flex space-x-4">
              {["Flights"].map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full font-medium ${
                    tab === "Flights"
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Date Inputs */}
            {/* <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-500">Check In</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full border rounded-lg p-3 pl-10"
                    defaultValue="2025-04-17"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    📅
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-500">Check Out</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full border rounded-lg p-3 pl-10"
                    defaultValue="2025-04-17"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    📅
                  </span>
                </div>
              </div>
              <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition">
                🔍 Search
              </button>
            </div> */}
            <FlightSearchForm />
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center md:justify-end z-10">
          <Image
            src="/banner.png"
            alt="Traveler"
            width={500}
            height={500}
            className="lg:mr-24 object-contain"
          />

          {/* Review Box */}
          <div className="absolute top-8 left-0 bg-white rounded-xl shadow-lg px-5 py-3 flex items-center space-x-3 -z-10">
            <div className="flex -space-x-2">
              <img
                src="/author.jpg"
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="/t2.png"
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="/t1.jpg"
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </div>
            <div>
              <p className="font-semibold">5.0 Stars</p>
              <p className="text-sm text-gray-500">69k reviews</p>
            </div>
          </div>

          {/* Hotline */}
          <div className="absolute bottom-8 right-0 bg-white border shadow-lg px-6 py-3 rounded-xl flex items-center space-x-3">
            <span className="text-red-500 text-2xl">📞</span>
            <div>
              <p className="text-xs text-gray-500">Hotline Booking</p>
              <p className="font-bold text-black">1-800-222-8888</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
