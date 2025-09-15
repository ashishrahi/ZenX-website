import Container from '@/components/Container'
import CountryExports from '@/components/CountryExports'
import ShadowContainer from '@/components/ShadowContainer'
import React from 'react'

const CountryExportPage = () => {
    return (
        <Container>
            <ShadowContainer>
                <CountryExports />
            </ShadowContainer>
        </Container>
    )
}

export default CountryExportPage