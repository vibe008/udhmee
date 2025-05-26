"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GetAllcatagory } from "../../../services/catagory";
import { GetAllTags } from "../../../services/tagservice"; // assuming you have this API

export default function Footer() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await GetAllcatagory();
        if (catRes.status === 200) setCategories(catRes.data);

        const tagRes = await GetAllTags();
        if (tagRes.status === 200) setTags(tagRes.data);
      } catch (err) {
        console.error("Error loading footer data", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-10 px-6 mt-10 absolute bottom-0 w-full h-[150px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Categories</h4>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="hover:underline text-sm"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Tags</h4>
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag._id}
                href={`/tag/${tag.slug}`}
                className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-white px-2 py-1 rounded text-xs hover:bg-blue-300"
              >
                {tag.name}
              </Link>
            ))}
          </ul>
        </div>

        {/* Inbox */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Message Us</h4>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            placeholder="Write your thoughts here..."
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white"
          />
          <button
            onClick={handleSubmit}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="text-center mt-10 text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} YourSiteName. All rights reserved.
      </div>
    </footer>
  );
}
