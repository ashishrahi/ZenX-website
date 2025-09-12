import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Heart, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Comment {
  id: number;
  author: string;
  content: string;
  rating?: number;
  date?: string;
}

interface CommentsProps {
  initialComments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleAddComment = () => {
    if (!author.trim() || !content.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author,
      content,
      rating,
      date: new Date().toLocaleDateString(),
    };

    setComments([newComment, ...comments]);
    setAuthor("");
    setContent("");
    setRating(0);
  };

  return (
    <div className="max-w-3xl mx-auto my-8">
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-gray-100">
          <CardTitle className="text-lg font-bold">Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {/* Add Comment Form */}
          <div className="space-y-2">
            <Input
              placeholder="Your Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
            />
            <Textarea
              placeholder="Write your review..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
            />
            {/* Star Rating */}
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={20}
                  className={`cursor-pointer ${
                    i <= rating ? "text-yellow-400" : "text-gray-300"
                  } transition-colors`}
                  onClick={() => setRating(i)}
                />
              ))}
            </div>
            <Button
              onClick={handleAddComment}
              className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto transition-colors"
            >
              Submit Review
            </Button>
          </div>

          {/* Comments List */}
          <ScrollArea className="h-80 mt-4">
            {comments.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {/* Avatar with first letter */}
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                              {comment.author.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{comment.author}</p>
                              <p className="text-gray-500 text-sm">{comment.date}</p>
                            </div>
                          </div>
                          {/* Star Rating */}
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${
                                  comment.rating && i <= comment.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Comment content */}
                        <p className="text-gray-700 mt-2">{comment.content}</p>

                        {/* Actions: like & reply */}
                        <div className="flex items-center space-x-4 mt-3 text-gray-500 text-sm">
                          <div className="flex items-center cursor-pointer hover:text-red-500 transition-colors">
                            <Heart size={16} className="mr-1" /> Like
                          </div>
                          <div className="flex items-center cursor-pointer hover:text-blue-500 transition-colors">
                            <MessageCircle size={16} className="mr-1" /> Reply
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comments;
