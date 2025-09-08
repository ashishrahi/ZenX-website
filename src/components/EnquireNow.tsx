import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

// Validation Schema
const EnquireSchema = Yup.object().shape({
  name: Yup.string().min(3, "Must be at least 3 characters").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be 10 digits")
    .required("Required"),
  interested: Yup.string().required("Required"),
});

const EnquireNow = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any, { resetForm }: any) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Form Submitted:", values);
      alert("Thank you! Your enquiry has been submitted.");
      setLoading(false);
      resetForm();
    }, 1500);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-2xl md:text-3xl font-light text-gray-400 mb-10 tracking-widest"
      >
        ENQUIRE NOW
      </motion.h2>

      {/* Form */}
      <Formik
        initialValues={{ name: "", email: "", phone: "", interested: "" }}
        validationSchema={EnquireSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-8">
            {/* Fields in one row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Name */}
              <div className="flex flex-col">
                <Field
                  name="name"
                  placeholder="NAME *"
                  
                  className="border-b border-gray-300 focus:outline-none focus:bg-yellow-600 py-2 text-sm tracking-widest placeholder-gray-700"
                />
                {errors.name && touched.name && (
                  <span className="text-red-500 text-xs mt-1">{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <Field
                  name="email"
                  placeholder="EMAIL ADDRESS *"
                  type="email"
                  className="border-b border-gray-300 focus:outline-none focus:border-black py-2 text-sm tracking-widest placeholder-gray-700"
                />
                {errors.email && touched.email && (
                  <span className="text-red-500 text-xs mt-1">{errors.email}</span>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <Field
                  name="phone"
                  placeholder="PHONE NO. *"
                  className="border-b border-gray-300 focus:outline-none focus:border-black py-2 text-sm tracking-widest placeholder-gray-700"
                />
                {errors.phone && touched.phone && (
                  <span className="text-red-500 text-xs mt-1">{errors.phone}</span>
                )}
              </div>

              {/* Interested In */}
              <div className="flex flex-col">
                <Field
                  as="select"
                  name="interested"
                  className="border-b border-gray-300 focus:outline-none focus:border-black py-2 text-sm tracking-widest text-gray-700"
                >
                  <option value="" disabled>
                    INTERESTED IN *
                  </option>
                  <option value="product1">Product 1</option>
                  <option value="product2">Product 2</option>
                  <option value="product3">Product 3</option>
                </Field>
                {errors.interested && touched.interested && (
                  <span className="text-red-500 text-xs mt-1">{errors.interested}</span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="bg-yellow-600 text-white px-8 py-3 rounded-full tracking-widest font-light transition duration-300 disabled:opacity-50"
              >
                {loading ? "SUBMITTING..." : "SUBMIT"}
              </motion.button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default EnquireNow;
