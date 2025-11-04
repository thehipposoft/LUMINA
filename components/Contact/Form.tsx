"use client";
import React, { useState } from 'react';
import axios from 'axios';

const initialValues = {
    name: '',
    customerEmail: '',
    message: '',
};

type FieldsType = {
    name: 'name' | 'customerEmail' | 'message' ;
    type: 'text' | 'textArea' | 'email';
    label: string;
    placeholder: string;
    required?: boolean;
}

type MyCustomFormProps = {
    fields: FieldsType[];
    onSuccessMessage: string;
    onErrorMessage: string;
    emailServiceURL: string;
    submitButtonLabel: string;
};

type FormValues = {
    name: string;
    customerEmail: string;
    message: string;
};

const MyCustomForm = ({
    fields,
    onSuccessMessage,
    onErrorMessage,
    emailServiceURL,
    submitButtonLabel
}:MyCustomFormProps) => {
    const [messageSent, setMessageSent] = useState<string>('');
    const [isAPILoading, setIsAPILoading] = useState<boolean>(false);
    const [messageDescription, setMessageDescription] = useState<string>('');
    const [values, setValues] = useState<FormValues>({
        name: '',
        customerEmail: '',
        message: '',
    });

    const renderSentMessage = () => {
        if (messageSent === 'succeed') {
            return <div className={`message succeed w-full text-center mb-6`}>
                <h2 className={'text-2xl text-white'}>Thanks! </h2>
                <p className='text-white'>{onSuccessMessage}</p>
            </div>
        }
        if (messageSent === 'error') {
            return <div className={`message error w-full text-center mb-6`}>
                <h2 className={'mb-4 text-red-500'}>Something went wrong</h2>
                <p>{onErrorMessage}</p>
                <p>{messageDescription}</p>
            </div>
        }
        return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { target } = e;
        const { name, value } = target;

        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (event) event.preventDefault();

        setIsAPILoading(true);
        axios.post(
            emailServiceURL,
            {
                message: values.message,
                name: values.name,
                customerEmail: values.customerEmail,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json, text/plain, */*',
                },
            }
        )
            .then(function (response) {
                setValues(initialValues);
                setMessageSent('succeed');
                setIsAPILoading(false);
            })
            .catch(function (error) {
                setMessageDescription(error.toString());
                setMessageSent('error');
                setIsAPILoading(false);
            });
    };

    return (
        <form
            className={`form mx-auto w-full `}
            onSubmit={(event) => handleSubmit(event)}
        >
            {
                fields.map((field, index)=> {
                    const { name, type, label, placeholder } = field;

                    switch (type) {
                        case 'textArea':
                            return (
                                <section className={'mb-4 flex flex-col gap-2'} key={name}>
                                    <label className={'contact-label font-medium'}>{label}</label>
                                    <textarea
                                        name={name}
                                        id={name}
                                        value={values[name]}
                                        rows={8}
                                        cols={40}
                                        className='resize-none py-3 px-4 rounded-sm bg-[#f7f7f7] border-none w-full border-black focus:outline-none focus:bg-brand-primary/10'
                                        onChange={handleChange}
                                        required={field.required}
                                    />
                                </section>
                            );
                        default:
                            return (
                                <section className='mb-4 flex flex-col gap-2' key={index}>
                                    <label className={'contact-label font-medium'}>{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        id={name}
                                        className={'py-3 px-4 lg:w-full rounded-sm w-full bg-[#f7f7f7] border-none focus:outline-none focus:bg-brand-primary/10'}
                                        onChange={handleChange}
                                        value={values[name]}
                                        required={field.required}
                                    />
                                </section>
                            )
                    }
                })
            }
            {renderSentMessage()}
            <button
                className={`${isAPILoading ? 'opacity-50' : ''} cursor-pointer relative flex justify-center items-center max-w-32 group`}
                disabled={isAPILoading}
                value={submitButtonLabel ? submitButtonLabel : 'Send'}
                type="submit"
            >
                <div className='duration-300 bg-transparent border-brand-turquoise border-2 rounded-full w-full h-full top-0 left-0 blur-sm absolute' />
                <div
                    className={`flex justify-center w-32 bg-brand-primary/75 border-brand-primary/75 border hover:bg-white/10 backdrop-blur-lg duration-300
                    text-white py-3 overflow-hidden rounded-full relative shadow-sm transition-colors`}
                >
                    <p className='relative z-10 tracking-normal group-hover:text-black-text group-hover:tracking-wider font-semibold duration-500'>{submitButtonLabel}</p>
                </div>
             </button>
        </form>
    )
};

export default MyCustomForm
