import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CollapsibleSectionProps {
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  content,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-muted rounded-lg overflow-hidden">
      {/* Section Header */}
      <button
        className="w-full flex justify-between items-center p-3 md:p-4 font-semibold text-sm md:text-base text-foreground hover:bg-muted/10 transition-colors"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={`${title}-content`}
      >
        {title}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-lg font-bold"
        >
          {isOpen ? "−" : "+"}
        </motion.span>
      </button>

      {/* Smooth Animated Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${title}-content`}
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{
              duration: 0.35,
              ease: [0.4, 0, 0.2, 1], // smoother easing
            }}
            className="overflow-hidden border-t border-muted"
          >
            <div className="p-3 md:p-4 text-sm md:text-base text-muted-foreground">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleSection;
