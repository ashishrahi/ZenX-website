import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AppInput from "./AppComponent/AppInput";
import AppButton from "./AppComponent/AppButton";

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
    <div className="max-w-2xl mx-auto bg-card p-8 rounded-xl shadow-md mt-10">
      <Formik
        initialValues={initialValues}
        validationSchema={DeliverySchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Delivery</h2>

            {/* First and Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-foreground">
                  First Name
                </label>
                <AppInput
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-ring outline-none bg-background text-foreground"
                />
                <ErrorMessage name="firstName" component="div" className="text-destructive text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1 text-foreground">
                  Last Name
                </label>
                <AppInput
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-ring outline-none bg-background text-foreground"
                />
                <ErrorMessage name="lastName" component="div" className="text-destructive text-sm mt-1" />
              </div>
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1 text-foreground">
                Company (optional)
              </label>
              <AppInput
                id="company"
                type="text"
                name="company"
                placeholder="Company name"
                className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-ring outline-none bg-background text-foreground"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1 text-foreground">
                Address
              </label>
              <AppInput
                id="address"
                type="text"
                name="address"
                placeholder="Street address"
                className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-ring outline-none bg-background text-foreground"
              />
              <ErrorMessage name="address" component="div" className="text-destructive text-sm mt-1" />
            </div>

            {/* Apartment */}
            <div>
              <label htmlFor="apartment" className="block text-sm font-medium mb-1 text-foreground">
                Apartment, suite, etc. (optional)
              </label>
              <AppInput
                id="apartment"
                type="text"
                name="apartment"
                placeholder="Apartment details"
                className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-ring outline-none bg-background text-foreground"
              />
            </div>

            {/* City, State, PIN */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1 text-foreground">
                  City
                </label>
                <AppInput
                  id="city"
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-ring outline-none bg-background text-foreground"
                />
                <ErrorMessage name="city" component="div" className="text-destructive text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium mb-1 text-foreground">
                  State
                </label>
                <AppInput
                  id="state"
                  as="select"
                  name="state"
                  className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-ring outline-none bg-background text-foreground"
                >
                  <option value="">Select State</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="DL">Delhi</option>
                  <option value="MH">Maharashtra</option>
                </AppInput>
                <ErrorMessage name="state" component="div" className="text-destructive text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="pin" className="block text-sm font-medium mb-1 text-foreground">
                  PIN Code
                </label>
                <AppInput
                  id="pin"
                  type="text"
                  name="pin"
                  placeholder="ZIP / Postal code"
                  className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-ring outline-none bg-background text-foreground"
                />
                <ErrorMessage name="pin" component="div" className="text-destructive text-sm mt-1" />
              </div>
            </div>

            {/* Submit Button */}
            <AppButton
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-md bg-primary text-primary-foreground font-medium text-lg hover:bg-primary/90 transition-colors"
            >
              {isSubmitting ? "Processing..." : "Continue to Payment"}
            </AppButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DeliveryForm;
