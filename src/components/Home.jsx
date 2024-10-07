import React from 'react'
import Hero from './Hero'
import FeaturedProducts from './FeaturedProducts'
import ClientTestamonial from './ClientTestamonial'
import Vlogs from './Vlogs'
import WhyChooseUs from './WhyChooseUs'

export default function Home(props) {
    return (
        <>
        <Hero/>
        <FeaturedProducts  updateCart={props.updateCart} showAlert={props.showAlert}/>
        <WhyChooseUs/>
        <ClientTestamonial/>
        <Vlogs/>
        </>
    )
}
