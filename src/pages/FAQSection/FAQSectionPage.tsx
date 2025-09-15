import FAQSection from '@/components/FAQ'
import { faqData } from '@/api/faq/faq'
import Container from '@/components/Container'
import ShadowContainer from '@/components/ShadowContainer'
const FAQSectionPage = () => {
  return (
    <Container>
        <ShadowContainer>
        <FAQSection
        faqData ={faqData}
        />
        </ShadowContainer>
    </Container>
  )
}

export default FAQSectionPage