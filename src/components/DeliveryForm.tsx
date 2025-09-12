import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ===== Delivery Form Validation Schema =====
const DeliverySchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pin: Yup.string()
    .matches(/^[0-9]{6}$/, "PIN must be 6 digits")
    .required("PIN is required"),
});

const DeliveryForm = ({ onSubmit }: { onSubmit: (values: any) => void }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pin: "",
  };

  return (
    // Card Container
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <Formik
        initialValues={initialValues}
        validationSchema={DeliverySchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900">Delivery</h2>

            {/* First and Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium mb-1">Company (optional)</label>
              <Field
                type="text"
                name="company"
                placeholder="Company name"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <Field
                type="text"
                name="address"
                placeholder="Street address"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Apartment */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Apartment, suite, etc. (optional)
              </label>
              <Field
                type="text"
                name="apartment"
                placeholder="Apartment details"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            {/* City, State, PIN */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <Field
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <Field
                  as="select"
                  name="state"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
                >
                  <option value="">Select State</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="DL">Delhi</option>
                  <option value="MH">Maharashtra</option>
                </Field>
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">PIN Code</label>
                <Field
                  type="text"
                  name="pin"
                  placeholder="ZIP / Postal code"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
                />
                <ErrorMessage
                  name="pin"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-md bg-black text-white font-medium text-lg hover:bg-gray-900 transition-colors"
            >
              {isSubmitting ? "Processing..." : "Continue to Payment"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DeliveryForm;
