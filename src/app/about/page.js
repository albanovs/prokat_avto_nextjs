import AboutBlock from '@/components/about'
import ReviewsSlider from '@/components/Review_block'
import React from 'react'

export default function About() {
    return (
        <div className="lg:mx-20 mx-5">
            <div className="mt-10">
                <AboutBlock />
            </div>
            <div className="mt-20">
                <ReviewsSlider />
            </div>
        </div>
    )
}
