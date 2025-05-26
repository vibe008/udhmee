"use client"
import { useSelector } from 'react-redux';
import Post from "../../ui/post/Post"
export default function Searchres() {
    const posts = useSelector((state) => state.search.searchresult);
    const searchQuery = useSelector((state) => state.search.searchQuery);
    const isSearchEmpty = !searchQuery || searchQuery.trim() === "";

    if (!isSearchEmpty && posts.length === 0) {
        return <div>No posts found</div>;
    }

    if (isSearchEmpty) return null;
    return (
        <div className="border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-8 bg-white dark:bg-gray-900 max-w-5xl mx-auto mt-6 transition-colors duration-300">
            <h3 className="text-center text-3xl font-bold text-gray-800 dark:text-white">You Search For</h3>
            <div className='my-2'>

            <Post data={posts} tag={true} catagory={true} author={true} /> 
            </div>
        </div>
    )

}