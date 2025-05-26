"use client";

import { useEffect, useState } from "react";
import { GetAllcatagory } from "../../../services/catagory";
import Link from "next/link";

export default function Categorys() {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await GetAllcatagory();
        console.log("cat res",res)
        if (res.status === 200) {
          setAllCategories(res.data);
          console.log("Categories fetched");
        } else {
          console.log("No categories found");
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    getCategories();
  }, []);

  return (
    <div className="bg-white mt-[120px] w-[85%] m-auto dark:bg-gray-900 shadow-lg rounded-2xl p-6  max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        🗂 Categories
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Browse by category
      </p>
      <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        {allCategories.length > 0 ? (
          allCategories.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category.slug}`}
              className="block bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-800 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 transition"
            >
              {category.name}
            </Link>
          ))
        ) : (
          <p className="text-gray-400 italic">No categories found.</p>
        )}
      </div>
    </div>
  );
}
