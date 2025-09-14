import Blog from "@/components/Blog"
import Container from "@/components/Container"
import { blogPosts } from '../../api/blog/blogData'
import ShadowContainer from "@/components/ShadowContainer"

const BlogPage = () => {
    return (
        <Container>

       <ShadowContainer>
            <Blog
                blogPosts={blogPosts}
            />
</ShadowContainer>

        </Container>
    )
}

export default BlogPage