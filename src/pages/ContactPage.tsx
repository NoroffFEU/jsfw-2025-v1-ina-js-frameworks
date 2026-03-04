import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { ContactFormData, ContactFormErrors } from "../types/Contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function ContactPage() {
  // state: stores user input values
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (data: ContactFormData): ContactFormErrors => {
    const newErrors: ContactFormErrors = {};

    // Full name validation
    if (data.fullName.trim().length < 3) {
      newErrors.fullName = "Full Name must be at least 3 characters.";
    }

    // Subject validation
    if (data.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Message validation
    if (data.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove errors for that specific field while typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-blue-100 to-white">
      <div className="w-full max-w-[600px] bg-white my-10 p-8 rounded-xl shadow-lg">
        {submitted ? (
          <div className="flex flex-col items-center justify-center text-blue-800 gap-5">
            <FontAwesomeIcon icon={faCircleCheck} size="10x" />
            <p className="text-[28px] max-[450px]:text-[24px] text-center font-bold">
              Your message has been sent successfully!
            </p>
            <Link
              to={"/"}
              className="flex justify-center w-full bg-blue-800 text-[18px] text-white py-3 font-semibold"
            >
              Go to Homepage
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h1 className="text-[40px] font-bold text-blue-800 mb-6 text-center">
              Contact Us
            </h1>
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-blue-800"
              />
              {errors.fullName && (
                <p className="text-blue-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-blue-800"
              />
              {errors.subject && (
                <p className="text-blue-500 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-blue-800"
              />
              {errors.email && (
                <p className="text-blue-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-blue-800 resize-none"
              />
              {errors.message && (
                <p className="text-blue-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-[18px] text-white py-3 font-semibold"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactPage;
