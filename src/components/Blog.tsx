import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogPost {
  category: string;
  title: string;
  description: string;
  link: string;
  image: string;
  tags?: string[];
}

interface BlogProps {
  blogPosts?: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ blogPosts = [] }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-12 md:mt-16 lg:mt-10">
      <section
        className="font-sans bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?technology,blog')",
        }}
      >
        {/* Overlay for readability */}
        <div className="bg-black/40 p-8 rounded-lg">
          <h1 className="text-4xl font-bold text-center mb-12 text-white">
            Our Blog
          </h1>

          {blogPosts.length === 0 ? (
            <p className="text-center text-gray-200">
              No blog posts available at the moment.
            </p>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, index) => (
                <Card
                  key={index}
                  className="hover:scale-105 transition-transform shadow-lg bg-white/90 backdrop-blur-sm"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardContent>
                    <span className="text-red-600 font-semibold uppercase text-sm">
                      {post.category}
                    </span>
                    <CardHeader className="p-0 mt-1">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-gray-700 text-sm mt-1">
                      {post.description}
                    </CardDescription>

                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="link"
                      asChild
                      className="text-red-600 font-semibold"
                    >
                      <a href={post.link}>Read More</a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
