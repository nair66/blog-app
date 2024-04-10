"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const onSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements["email"].value;
    const password = event.target.elements["password"].value;
    console.log("entered values", email, password);

    fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((message) => {
      router.push("/dashboard");
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
