"use client"
import Post from "@/components/ui/post/Post";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GetStorysbycatagorySlug } from "../../../../services/postservices"
export default function page() {
    const params = useParams()

    const slug = params.slug;
   const [allpost ,setAllPost]=useState([])


    useEffect(() => {
        try {
            const getStory = async () => {
                const res = await GetStorysbycatagorySlug(slug)
                if (res.status === 200) {
                    console.log("res story", res)
                    setAllPost(res.data.posts)
                    // SetStoryData(res.data)
                    // setTitle(res.data.title || "");
                    // setContent(res.data.story || "");
                    // setAudioUrl(res.data.voiceurl || "");
                }
            }
            getStory()
        } catch (error) {
            console.log("error", error)
        }
    }, [])

    console.log("post",allpost)
    // console.log("slug",slug)
    return (
        <>
            <div className="border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-8 bg-white dark:bg-gray-900 max-w-5xl mx-auto mt-6 transition-colors duration-300">
                <div className="flex items-center gap-6 mb-8">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Category</h2>
                        <p className="text-gray-600 dark:text-gray-400">this catagory belong to this</p>
                    </div>
                </div>
                <Post  author={true} data={allpost} tag={true} catagory={false}/>
            </div>
        </>
    )
}