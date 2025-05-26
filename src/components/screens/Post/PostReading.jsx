'use client';

import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
import { GetStorysbySlug } from "../../../services/postservices"
import sanitizeHtml from 'sanitize-html';
import Link from 'next/link';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
export default function PostReading() {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(132);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [name, setName] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [allpost, setAllPost] = useState({})
    const handleLikeToggle = () => {
        setLiked(!liked);
        setLikesCount(prev => liked ? prev - 1 : prev + 1);
    };
    const params = useParams()
    const slug = params.slug
    useEffect(() => {
        const getStory = async () => {
            try {
                const res = await GetStorysbySlug(slug)
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
        getStory()
    }, [])
    console.log("allpost", allpost)
    const handleCommentSubmit = () => {
        if (newComment.trim() && name.trim()) {
            const newEntry = {
                id: Date.now(),
                name,
                text: newComment,
                replies: []
            };
            setComments([newEntry, ...comments]);
            setNewComment('');
            setName('');
        }
    };

    const handleReplySubmit = (commentId) => {
        if (!replyText.trim()) return;

        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? {
                        ...comment,
                        replies: [...comment.replies, { name: name || 'Anonymous', text: replyText }]
                    }
                    : comment
            )
        );
        setReplyTo(null);
        setReplyText('');
    };
    const catitems = allpost !== 0 &&  allpost?.categories?.map((item) => { return item })
    // console.log("catitems", catitems && catitems[0].slug)
    const plainText = sanitizeHtml(allpost?.story || "", { allowedTags: [], allowedAttributes: {} });
    return (
        <div className="border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-8 bg-white dark:bg-gray-900 max-w-5xl mx-auto mt-6 transition-colors duration-300">
            {/* Post Info */}
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 flex flex-wrap gap-4 justify-between">
                <Link href={`/post-user/${allpost.userId}`}>
                    <span className="font-medium text-gray-800 dark:text-gray-200">Author: <strong>@{allpost.author}</strong></span>
                </Link>
                <span>📅 April 30, 2025</span>
                <div>
                <span className="bg-blue-100 mx-1 dark:bg-blue-800 text-blue-600 dark:text-blue-300  py-2 px-2 rounded-full">Category:
                 {catitems && catitems[0] && 
                 <Link href={`/category/${catitems[0].slug}`}>{catitems && catitems[0].name}</Link>
                 }   
                </span>
                </div>


                <div className="flex flex-wrap gap-2">
                    {allpost?.tags && allpost.tags.map((item ,key)=>{
                        return (
                    <span key={key} className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded"><Link href={`/tag/${item.slug}`}>{item.name}</Link></span>
                        )
                    })}

                </div>
            </div>

            {/* Post Title */}
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                {allpost.title}
            </h1>

            {/* Post Content */}
            <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-6">
              {plainText}
              
            </p>

            {/* Like Button */}
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={handleLikeToggle}
                    className="text-red-500 hover:scale-110 transition-transform duration-200"
                >
                    {liked ? <FavoriteIcon size={22} /> : <FavoriteBorderIcon size={22} />}
                </button>
                <span className="text-gray-700 dark:text-gray-300 text-sm">{allpost.likes} Likes</span>
            </div>

            {/* Comment Section */}
            <div className="border-t pt-4 mt-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Comments</h2>

                {/* Comment Input */}
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 px-4 py-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 px-4 py-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                    <button
                        onClick={handleCommentSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Post
                    </button>
                </div>

                {/* Comments List */}
                {comments.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
                ) : (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-sm">
                                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">@{comment.name}</div>
                                <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                                <button
                                    onClick={() => setReplyTo(comment.id)}
                                    className="text-sm text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-1"
                                >
                                    <ReplyIcon className="inline" /> Reply
                                </button>

                                {/* Replies */}
                                {comment.replies.length > 0 && (
                                    <div className="ml-4 mt-2 space-y-2">
                                        {comment.replies.map((reply, idx) => (
                                            <div key={idx} className="bg-white dark:bg-gray-700 p-2 rounded text-sm">
                                                <strong className="text-gray-800 dark:text-gray-200">@{reply.name}:</strong> {reply.text}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Reply Input */}
                                {replyTo === comment.id && (
                                    <div className="mt-2 flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="text"
                                            placeholder="Write a reply..."
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            className="flex-1 px-3 py-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                        />
                                        <button
                                            onClick={() => handleReplySubmit(comment.id)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                        >
                                            Reply
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
