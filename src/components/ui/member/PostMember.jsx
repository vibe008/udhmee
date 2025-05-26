"use client";

import { Button } from "@mui/material";
import { useState } from "react";

export default function PostMember() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex justify-center mt-[100px] w-[85%] m-auto items-center min-h-[40vh] bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-5 border dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Become a Member & Start Earning 💰
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Enter your email to get exclusive info and offers.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <Button
          variant="contained"
          size="large"
          className="w-full !bg-blue-600 hover:!bg-blue-700 !text-white !rounded-lg"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
