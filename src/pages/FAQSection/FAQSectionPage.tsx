import FAQSection from '@/components/FAQ'
import Container from '@/components/Container'
import ShadowContainer from '@/components/ShadowContainer'
import { useFAQs } from '@/hooks/faq/useFAQ'
const FAQSectionPage = () => {
  const {data:faqData} = useFAQs()
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