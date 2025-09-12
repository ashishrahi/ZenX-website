import Blog from "@/components/Blog"
import Container from "@/components/Container"
import { blogPosts } from '../../api/blog/blogData'

const BlogPage = () => {
    return (
        <Container>


            <Blog
                blogPosts={blogPosts}
            />


        </Container>
    )
}

export default BlogPage