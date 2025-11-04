import React from 'react'
import Image from 'next/image'
import Form from './Form'


const Contact = () => {
  return (
        <section id="contact" className="py-20 px-6">
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto justify-between">
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
                <div className="bg-white rounded-2xl shadow-xl md:p-8 p-6 md:w-[620px]">
                              <Form
                                    fields={[
                                        {
                                            name: 'name',
                                            type: 'text',
                                            label: 'Company / Name*',
                                            placeholder: 'Name',
                                            required: true,
                                        },
                                        {
                                            name: 'customerEmail',
                                            type: 'email',
                                            label: 'Email*',
                                            placeholder: 'Email*',
                                            required: true,
                                        },
                                        {
                                            name: 'message',
                                            type: 'textArea',
                                            label: 'Message*',
                                            placeholder: 'Message*',
                                            required: true,
                                        },
                                    ]}
                                    onSuccessMessage={'Your message was submited succesfully. We will contact you soon.'}
                                    onErrorMessage={'Please, try again in some minutes'}
                                    submitButtonLabel={'Send'}
                                    emailServiceURL={'https://thehippoapi.netlify.app/.netlify/functions/api/tem-architecture-email'}
                                />
                </div>
            </div>
        </section>
  )
}

export default Contact
