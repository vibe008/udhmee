'use client';

import Post from "@/components/ui/post/Post";
import { useEffect, useState } from "react";
import {GetLatestPost} from "../../../services/postservices"
export default function LatestPost() {
  const [posts, setPosts] = useState([])
useEffect(() => { 
    const getPost = async () => {
        try {
            const res = await GetLatestPost();
            console.log("res", res);
            if (res) {
                setPosts(res);
                // setadded(false);
            }
        } catch (error) {
            console.log("get catagory error", error);
        }
    };

    getPost();
}, []);

    // console.log("posts",posts)
    return (
        <div className="border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-8 bg-white dark:bg-gray-900 max-w-5xl mx-auto mt-2 transition-colors duration-300">
            <div className="mb-8">
                <h3 className="text-center text-3xl font-bold text-gray-800 dark:text-white">Latest Stories</h3>
                <p className="text-center text-gray-500 dark:text-gray-400 mt-2">Catch up on our newest articles and stories</p>
            </div>
            <Post author={true} data={posts} tag={true} catagory={true}/>
        </div>
    );
}
