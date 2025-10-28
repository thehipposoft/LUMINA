import React from 'react'
import Image from 'next/image'

const Contact = () => {
  return (
        <section id="contact" className="py-20 px-6">
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto justify-between">
                <div className="md:w-[605px] md:gap-4 gap-8 flex relative">
                    <Image src={'/images/vectors/shape2.svg'} width={120} height={360} alt="Lumina Arrow" className="md:w-16 w-12 " />
                    <div className='flex flex-col justify-center'>
                        <h2 className="text-4xl font-bold text-[#151f25] mb-4">Contact us</h2>
                        <h3 className="text-2xl font-semibold text-[#151f25] mb-4">Let&apos;s Create the Future Together</h3>
                        <p className="text-black leading-relaxed text-sm md:w-[400px]">
                        Whether you&apos;re developing a next-generation device or
                        looking for research solutions, our team is ready to
                        collaborate. Contact us to explore how LUMINA can help
                        bring your vision to life.
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 md:w-[620px]">
                    <form className="space-y-6">
                        <div className='font-medium'>
                            Company / Name
                            <input
                            type="text"
                            className="w-full px-4 py-3 mt-2 bg-[#F7F7F7] rounded-lg focus:ring-2 focus:ring-[#007BFF] focus:border-transparent outline-none"
                            />
                        </div>
                        <div className='font-medium'>
                            Email
                            <input
                            type="email"
                            className="w-full px-4 py-3 mt-2 bg-[#F7F7F7] rounded-lg focus:ring-2 focus:ring-[#007BFF] focus:border-transparent outline-none"
                            />
                        </div>
                        <div className='font-medium'>
                            Message
                            <textarea
                            rows={4}
                            className="w-full px-4 py-3 mt-2 bg-[#F7F7F7] rounded-lg focus:ring-2 focus:ring-[#007BFF] focus:border-transparent outline-none resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-fit bg-[#4E77FF] text-white py-3 px-6 rounded-lg hover:bg-[#35E3ED] transition-colors font-semibold"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </section>
  )
}

export default Contact
