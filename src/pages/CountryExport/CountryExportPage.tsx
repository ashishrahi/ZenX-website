import Container from '@/components/Container'
import CountryExports from '@/components/CountryExports'
import ShadowContainer from '@/components/ShadowContainer'
import { useExports } from "@/hooks/Exports/useExport";
const CountryExportPage = () => {
    const {data:exportData} = useExports()
    return (
        <Container>
            <ShadowContainer>
                <CountryExports
                exportData ={exportData}
                />
            </ShadowContainer>
        </Container>
    )
}

export default CountryExportPage