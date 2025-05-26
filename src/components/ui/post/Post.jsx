'use client';

import { useState } from "react";
import Link from "next/link";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useDispatch } from "react-redux";
import { clearSearchResults } from "@/Redux/store/searchresSlider";

const POSTS_PER_PAGE = 10;

export default function Post({ data, tag, catagory ,author}) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / POSTS_PER_PAGE);
     const dispach = useDispatch()
    const currentPosts = data.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );
    console.log("currentPosts",currentPosts)
    console.log("data", data)
    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="space-y-8">
                {currentPosts?.map((item, index) => (
                    <div
                        key={index}
                        className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-800"
                    >
                        <Link
                       onClick={() => dispach(clearSearchResults())}
                            //  router.push(`/edit-read-story/${item.slug}/${item._id}`);
                            href={`/story/${item.slug}`}
                            className="flex flex-col lg:flex-row items-center text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline gap-2"
                        >
                            {item.title} {author && <span>by { item.author}</span> }
                            <OpenInNewIcon fontSize="small" />
                        </Link>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
                            <span><strong>Date:</strong> {item.date}</span>
                            {item.categories && item.categories.length > 0 && catagory &&
                                <span><strong>Category: </strong>
                                    {item.categories.map((cat, key) => {
                                        return (
                                            <Link onClick={() => dispach(clearSearchResults())} key={key} href={`/category/${cat.slug}`}>
                                                <span
                                                    className="inline-block mx-1 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 px-2 py-1 rounded text-xs mb-2"
                                                >
                                                    #{cat.name}
                                                </span>
                                            </Link>
                                        )
                                    })}

                                </span>
                            }

                            {item.tags && item.tags.length > 0 && tag &&
                                <span><strong>Tag: </strong>
                                    {item.tags.map((item, key) => {
                                        return (
                                            <Link onClick={() => dispach(clearSearchResults())} key={key} href={`/tag/${item.name}`}>
                                                <span
                                                    className="text-xs mx-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded"
                                                >
                                                    #{item.name}
                                                </span>
                                            </Link>
                                        )
                                    })}

                                </span>
                            }

                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                            {/* {post.summary} */}
                        </p>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 &&
                        <div className="flex justify-center mt-10 gap-2">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => goToPage(i + 1)}
                        className={`px-3 py-2 rounded ${currentPage === i + 1
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded disabled:opacity-50"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            }

        </div>
    );
}
