import CollapsibleSection from "./CollapsibleSection";
import images from "@/assets/men/images";
import AppButton from "./AppComponent/AppButton";
import ColoredTitle from "./ColoredTitle";


const FAQSection = ({faqData}) => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 rounded-3xl shadow-sm bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        {/* Left Side - Image with Overlay */}
        <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={images.fqQ}
            alt="Innerwear FAQ Illustration"
            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
          <div className="absolute bottom-4 left-4 px-4 py-2 rounded-lg shadow text-sm font-semibold bg-white/90 text-foreground">
            Quality Innerwear You Can Trust
          </div>
        </div>

        {/* Right Side - FAQ Section */}
        <div>
          <h2 className="text-4xl font-bold mb-3 text-foreground">
                  <ColoredTitle title="Frequently Asked Questions" />
            
          </h2>
          <p className="mb-8 text-muted-foreground">
            Find answers to common questions about our innerwear products,
            sizing, and policies.
          </p>

          {/* Collapsible Sections instead of Accordion */}
          <div className="space-y-3">
            {faqData?.map((item, index) => (
              <CollapsibleSection
                key={index._id}
                title={item.question}
                content={item.answer}
              />
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-10 p-5 rounded-xl border border-destructive/20 bg-destructive/10">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Still have questions?
            </h3>
            <p className="mb-4 text-muted-foreground">
              Can’t find the answer you’re looking for? Reach out to our
              customer care team for assistance.
            </p>
            <AppButton className="px-6 py-2 rounded-lg shadow bg-destructive text-white hover:bg-primary transition-colors">
              Contact Us
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
