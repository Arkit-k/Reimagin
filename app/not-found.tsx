"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl text-white font-bold mb-4">404</h1>
      <p className="text-lg text-white mb-6">Oops! The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:purple-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}