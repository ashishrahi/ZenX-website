import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Home, Construction } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Icon with bounce animation */}
        <motion.div
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AlertTriangle className="h-10 w-10" />
        </motion.div>

        {/* 404 Header */}
        <motion.h1
          className="mb-3 text-7xl font-extrabold text-primary"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mb-6 text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          Oops! The page you are looking for doesn’t exist or has been moved.
        </motion.p>

        {/* Return Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-md bg-primary text-white hover:bg-primary/90"
          >
            <Home className="h-5 w-5" />
            Return to Home
          </Link>
        </motion.div>

        {/* Under Construction Section */}
        <motion.div
          className="mt-12 p-6 rounded-lg border border-border bg-card shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.div
            className="flex justify-center mb-4"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Construction className="h-12 w-12 text-accent" />
          </motion.div>

          <h2 className="text-xl font-bold text-foreground mb-2">
            Under Construction
          </h2>
          <p className="text-muted-foreground text-sm">
            This section of the site is currently under construction. Please
            check back later for updates.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
