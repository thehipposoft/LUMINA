import React from 'react'
import { Metadata } from "next";
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Lumina | Blog',
    description: 'Discover the benefits of our innovative solutions and services.',
};

export default function BlogPage() {
  return (
    <div className='flex flex-col items-center md:max-w-7xl mx-auto gap-16'>
        <div className='relative md:w-7xl w-screen h-[590px]'>
            <Image
                fill
                src={"/images/blog/blog.jpg"}
                alt='Blog image'
                className='object-cover rounded-md object-left md:object-center'
             />
        </div>
        <div className='flex flex-col md:max-w-4xl max-w-[80vw] gap-4'>
            <h1 className='md:text-3xl text-2xl font-semibold'>Listen to Charles Hardman Podcast from Loyola University of Chicago:</h1>
            <p className='text-sm text-black/50 '>In this episode, I am joined by Charles Hardeman, a Loyola alum who co-founded a business with chemistry professor Jacob Ciszek while still in college. This business, Molecular Interfaces, specializes in technological advancements in large-scale displays with a range of applications, such as digitizing blueprints. In the episode, he shares his experience participating in the research that inspired the business, as well as how he applied both his science and business background as the entrepreneurial lead for the venture, which contributed to successful grant funding from the National Science Foundation. He also talks about how he balanced his time as a college student and gives his advice for anyone interested in starting a business while in college!</p>
            <iframe
                src="https://creators.spotify.com/pod/profile/ignite-lab/embed/episodes/How-Undergraduate-Research-Led-Charles-Hardeman-to-a-Business-Opportunity-and-250-000-in-Grant-Funding-e119mg8/a-a5knjva"
                height="202px"
                width="900px"
                frameBorder="0"
                scrolling="no"
                className='w-full mt-8 mb-16 h-32 md:h-full'
                >
            </iframe>
        </div>
    </div>
  )
}
