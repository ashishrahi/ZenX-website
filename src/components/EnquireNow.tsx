import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import * as Label from "@radix-ui/react-label";

// Validation schema
const EnquireSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const EnquireNow = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any, { resetForm }: any) => {
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      console.log("Enquiry Submitted:", values);
      alert("Thank you! Your enquiry has been submitted successfully.");
      setLoading(false);
      resetForm();
    }, 1500);
  };

  return (
    <section id="enquire-now" className="max-w-4xl mx-auto px-4 py-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-extralight text-gray-900">
          Enquire Now
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Have questions about our products or services? Fill out the form below
          and we’ll get back to you as soon as possible.
        </p>
      </motion.div>

      {/* Form */}
      <Formik
        initialValues={{ name: "", email: "", phone: "", message: "" }}
        validationSchema={EnquireSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form className="space-y-6 bg-white rounded-2xl shadow-md p-8">
            {/* Name Field */}
            <div>
              <Label.Root
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </Label.Root>
              <Field
                id="name"
                name="name"
                placeholder="Enter your full name"
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.name && touched.name
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <Label.Root
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </Label.Root>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <Label.Root
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </Label.Root>
              <Field
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.phone && touched.phone
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {errors.phone && touched.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <Label.Root
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </Label.Root>
              <Field
                as="textarea"
                id="message"
                name="message"
                placeholder="Type your message here..."
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.message && touched.message
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />
              {errors.message && touched.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 disabled:opacity-70"
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </motion.div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default EnquireNow;
