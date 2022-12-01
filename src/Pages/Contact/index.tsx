import React, { useEffect, useRef, useState } from "react";
import { contact } from "../../api/user";
import PageLoading from "../../Components/Loader";
import PageBanner from "../../Components/PageBanner";
import SuccessModal from "../../Components/SuccessModal";
import { useAppSelector } from "../../hooks";

import Footer from "../Components/Footer";

const ContactForm = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const fullNameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const phoneNumberRef = useRef<HTMLInputElement | null>(null);
    const messageRef = useRef<HTMLTextAreaElement | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setSubmitting(true);
            const userData = {
                fullName: fullNameRef.current?.value,
                email: emailRef.current?.value,
                phoneNumber: phoneNumberRef.current?.value,
                message: messageRef.current?.value
            }

            const response = await contact(userData);
            setShowSuccessModal(true);

            if (fullNameRef.current && emailRef.current && phoneNumberRef.current && messageRef.current) {
                fullNameRef.current.value = "";
                emailRef.current.value = "";
                phoneNumberRef.current.value = "";
                messageRef.current.value = "";
            }

            setSubmitting(false);

        } catch (err) {
            setSubmitting(false);

        }
    }
    return (
        <div className="contact-form-container">
            <SuccessModal show={showSuccessModal} message={"Message sent successfully!"} onCloseFn={setShowSuccessModal} />
            <form onSubmit={handleSubmit}>
                <div className="">
                    <div className="flex flex-col lg:flex-row">
                        <div className="w-full">
                            <input required type="text" ref={fullNameRef} name="name" placeholder="Full Name" className="w-full lg:w-11/12 py-6 border-0 outline-none border-b border-x-gray-dark" />
                        </div>

                    </div>
                    <div className="flex mt-6 flex-col lg:flex-row">
                        <div className="w-full lg:w-6/12">
                            < input required ref={phoneNumberRef} type="phone" name="phone" placeholder="Phone" className="w-full lg:w-11/12 py-6 border-0 outline-none border-b border-x-gray-dark" />
                        </div>
                        <div className="w-full lg:w-6/12">
                            <input required ref={emailRef} type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="Email" className="w-full py-6 border-0 outline-none border-b border-x-gray-dark" />
                        </div>
                    </div>
                    <div className="flex mt-6">
                        <div className="w-full">
                            <textarea required ref={messageRef} cols={2} rows={2} name="message" placeholder="Message" className="w-full py-6 border-0 outline-none border-b border-x-gray-dark" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <button disabled={submitting} type="submit" className="bg-e_red px-10 py-2 text-white font-bold">Submit</button>
                    </div>
                </div>
            </form>
        </div>

    )
}

const ContactSection = () => {
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.contactState);

    return (
        <div className="contact-form">
            <div className="py-24 lg:px-12 px-2">
                <div className="flex px-6 lg:px-16 gap-y-12 flex-col lg:flex-row">
                    <div className="w-full lg:w-6/12">
                        <div>
                            <h1
                                id="contactHeading"
                                className="text-xl lg:text-5xl font-bold border-r-4 border-red"
                                dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.heading }}
                            />
                        </div>
                        <div className=" grid gap-4 lg:grid-cols-2 lg:gap-12 mt-12">
                            <div>
                                <h1 id="addressHeading" className="mb-4 font-medium"
                                    dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.addressHeading }}
                                />
                                <p id="addressDescription" className="text-gray text-sm lg:text-lg "
                                    dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.addressDescription }}
                                />

                            </div>
                            <div>
                                <h1
                                    id="phoneHeading"
                                    className="mb-4 font-medium"
                                    dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.phoneHeading }}
                                />
                                <a href={`tel:${pageContent.contactFormState.phoneDescription}`}>

                                    <p
                                        id="phoneDescription" className="text-gray text-sm lg:text-lg "
                                        dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.phoneDescription }}
                                    />
                                </a>
                            </div>
                            <div>
                                <h1

                                    id="officeHeading"
                                    className="mb-4 font-medium"
                                    dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.officeHeading }}
                                />
                                <p id="officeDescription"
                                    className="text-gray text-sm lg:text-lg "
                                    dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.officeDescription }}
                                />
                                <p className="text-sm text-gray">
                                    8am to 5pm WAT
                                </p>
                            </div>
                            <div>
                                <h1

                                    id="emailHeading"
                                    className="mb-4 font-medium"
                                    dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.emailHeading }}
                                />
                                <a href={`mailto:${pageContent.contactFormState.emailDescription}`}>

                                    <p id="emailDescription" className="text-gray text-sm lg:text-lg "
                                        dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.emailDescription }}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 lg:p-6">
                        <ContactForm />
                    </div>

                </div>
            </div>
        </div>
    )
}

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.contactState);

    return (
        <div className="about">

            <PageBanner title="Contact" path="Contact" image={pageContent.landingBg} />
            <ContactSection />
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3332.724506287891!2d3.3426588478755295!3d6.609634025927371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b922cab41d259%3A0xdf22ddcd7d2d5032!2s49%20Adeniyi%20Jones%2C%20Ikeja%20101233%2C%20Ikeja!5e0!3m2!1sen!2sng!4v1642367344563!5m2!1sen!2sng" width="100%" height="450" style={{ border: 0 }} allowFullScreen={false} loading="lazy"></iframe>
        </div>
    )
}


export default Contact;