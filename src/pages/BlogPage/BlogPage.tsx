import Blog from "@/components/Blog"
import Container from "@/components/Container"
import ShadowContainer from "@/components/ShadowContainer"
import { useBlogs } from "@/hooks/Blog"
const BlogPage = () => {
    const { data: blogPosts } = useBlogs()
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