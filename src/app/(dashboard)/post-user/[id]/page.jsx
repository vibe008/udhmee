'use client';

import Avatar from '@mui/material/Avatar';
import { Card, CardContent, Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import Post from "@/components/ui/post/Post";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GetStorysbyUserId } from '../../../../services/postservices';
import { GetStorysUser } from '../../../../services/postuserservices';
export default function page() {
    const [allpost, setAllPost] = useState([])
    const [postuser, setPostuser] = useState({})
    const params = useParams()
    const id = params.id

    // Dummy data for demonstration
    const user = {
        avatar: 'https://i.pravatar.cc/100',
        username: 'john_doe',
        bio: 'Tech enthusiast | Blogger | JavaScript ninja',
        posts: [
            {
                id: 1,
                title: 'How to Build a Blog with Next.js and Tailwind',
                date: 'April 30, 2025',
                category: 'Tech',
                tags: ['Next.js', 'Tailwind', 'React']
            },
            {
                id: 2,
                title: 'Understanding Server Components in Next.js',
                date: 'May 10, 2025',
                category: 'Programming',
                tags: ['Next.js', 'Server Components']
            }
        ]
    };
    useEffect(() => {
        const getStory = async () => {
            try {
                const res = await GetStorysbyUserId(id)
                if (res.status === 200) {
                    setAllPost(res.data)
                    console.log("get post by user")
                }
                else {
                    console.log("no such post Found")
                }
            } catch (error) {
                console.log("error", error)
            }
        }
        const getuser = async () => {
            try {
                const res = await GetStorysUser(id)
                if (res.status === 200) {
                    setPostuser(res.data)
                    console.log("get post by user")
                }
                else {
                    console.log("no such post Found")
                }
            } catch (error) {
                console.log("error", error)
            }
        }

        getStory()
        getuser()
    }, [])

    return (
        <div className="border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-8 bg-white dark:bg-gray-900 max-w-5xl mx-auto mt-6 transition-colors duration-300">
            {/* User Info */}
            <div className="flex items-center gap-6 mb-8">
                <Avatar
                    alt={user.username}
                    src={user.avatar}
                    sx={{ width: 64, height: 64 }}
                />
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">@{postuser.username}</h2>
                    {/* <p className="text-gray-600 dark:text-gray-400">{user.bio}</p> */}
                </div>
            </div>

            {/* User Posts */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Posts by {postuser.username}</h3>
                 
                <Post author={false} data={allpost} tag={true} catagory={true}/>
            </div>
        </div>
    );
}
