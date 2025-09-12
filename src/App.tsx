import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import MenCategoryProducts from "./components/MenCategoryProducts";

// ✅ Lazy loading for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductDetailsPage = lazy(() =>
  import("./pages/Men/ProductDetailPage/MenProductDetailPage")
);
const CheckoutPage = lazy(() => import("./pages/CheckoutPage/CheckoutPage"));
const AccountPage = lazy(() => import("./pages/Account/AccountPage"));
const MenPage = lazy(() => import("./pages/Men/MenPage"));
const WomenProductDetailsPage = lazy(() =>
  import("./pages/Women/WomenProductDetailPage/WomenProductDetailPage")
);
const WomenPage = lazy(() => import("./pages/Women/WomenPage"));
const BlogPage = lazy(() => import("./pages/BlogPage/BlogPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Global Header */}
        <Header />

        {/* Suspense ensures that while components are loading, fallback UI is shown */}
        <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
          <Routes>
            {/* Home and Static Pages */}
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/faq" element={<Index />} />
            <Route path="/kids" element={<Index />} />

            {/* ✅ MEN Nested Routes */}
            <Route path="/mens" element={<MenPage />}>
              {/* Default men category page */}
              <Route path="category/:slug" element={<MenCategoryProducts/>}/>
          {/* Men product details page */}
              <Route path="product/:id" element={<ProductDetailsPage />} />
            </Route>

            {/* ✅ WOMEN Nested Routes */}
            <Route path="/womens" element={<WomenPage />}>
              {/* Default women category page */}
              {/* <Route index element={<Products />} /> */}

              <Route path="product/:id" element={<WomenProductDetailsPage />} />
            </Route>

            {/* Checkout and Account */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account" element={<AccountPage />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer/>
      <Chatbot />

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
