import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AppInput from "./AppComponent/AppInput";
import AppButton from "./AppComponent/AppButton";

export interface DeliveryFormValues {
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pin: string;
  country: string;
  paymentMethod: "Cash on Delivery" | "PayPal" | "Credit Card";
}

interface DeliveryFormProps {
  onSubmit: (values: DeliveryFormValues) => void;
  isSubmitting?: boolean;
}

const DeliverySchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pin: Yup.string()
    .matches(/^[0-9]{6}$/, "PIN must be 6 digits")
    .required("PIN is required"),
  country: Yup.string().required("Country is required"),
  paymentMethod: Yup.mixed<DeliveryFormValues["paymentMethod"]>()
    .oneOf(["Cash on Delivery", "PayPal", "Credit Card"])
    .required("Payment method is required"),
});

const DeliveryForm: React.FC<DeliveryFormProps> = ({ onSubmit, isSubmitting }) => {
  const initialValues: DeliveryFormValues = {
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pin: "",
    country: "India",
    paymentMethod: "Cash on Delivery",
  };

  return (
    <div className="max-w-2xl mx-auto bg-card p-8 rounded-xl shadow-md mt-10">
      <Formik<DeliveryFormValues>
        initialValues={initialValues}
        validationSchema={DeliverySchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Delivery</h2>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <AppInput label="First Name" name="firstName" placeholder="Enter first name" />
              </div>
              <div>
                <AppInput label="Last Name" name="lastName" placeholder="Enter last name" />
              </div>
            </div>

            {/* Company */}
            <AppInput label="Company (optional)" name="company" placeholder="Company name" optional />

            {/* Address */}
            <AppInput label="Address" name="address" placeholder="Street address" />
            <AppInput label="Apartment, suite, etc. (optional)" name="apartment" placeholder="Apartment details" optional />

            {/* City, State, PIN */}
            <div className="grid grid-cols-3 gap-4">
              <AppInput label="City" name="city" placeholder="City" />
              <AppInput label="State" name="state" as="select">
                <option value="">Select State</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="DL">Delhi</option>
                <option value="MH">Maharashtra</option>
              </AppInput>
              <AppInput label="PIN Code" name="pin" placeholder="ZIP / Postal code" />
            </div>

            {/* Country */}
            <AppInput label="Country" name="country" placeholder="Country" />

            {/* Payment Method Radio Buttons */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Payment Method</label>
              {(["Cash on Delivery", "PayPal", "Credit Card"] as const).map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={values.paymentMethod === method}
                    onChange={() => setFieldValue("paymentMethod", method)}
                  />
                  <span>{method}</span>
                </label>
              ))}
              <ErrorMessage name="paymentMethod" component="div" className="text-destructive text-sm mt-1" />
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
