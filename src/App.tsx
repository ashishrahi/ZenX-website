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
import MainLayout from "./components/MainLayout";
import KidsPage from "./pages/Kids/KidsPage";
import KidsCategoryProducts from "./components/KidsCategoryProducts";
import KidsProductDetailPage from "./pages/Kids/KidsProductDetails/KidsProductDetailsPage";
import WomenCategoryProducts from "./components/WomenCategoryProducts";
import LoadingPage from "./components/LoadingPage";
import Sidebar from "./components/Sidebar";

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
        <Suspense fallback={<LoadingPage/>}>
          <Routes>
            {/* Home and Static Pages */}
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/faq" element={<Index />} />
            <Route path="/kids" element={<Index />} />

            {/* MEN Nested Routes */}
            <Route path="/mens" element={<MainLayout />}>
              <Route index element={<MenPage />} />
              {/* Default men category page */}
              <Route path="category/:slug" element={<MenCategoryProducts />} />
              {/* Men product details page */}
              <Route path="product/:id" element={<ProductDetailsPage />} />
            </Route>

            {/* WOMEN Nested Routes */}
            <Route path="/womens" element={<MainLayout />}>
              {/* Default women category page */}
              <Route index element={<WomenPage />} />
              {/* Default men category page */}
              <Route path="category/:slug" element={<WomenCategoryProducts />} />
              {/*Women product details page  */}
              <Route path="product/:id" element={<WomenProductDetailsPage />} />
            </Route>

            {/* KIDS Nested Routes */}

            <Route path="/kids" element={<MainLayout />}>
              {/* Default kids category page */}
              <Route index element={<KidsPage />} />

              {/* Kids category products page */}
              <Route path="category/:slug" element={<KidsCategoryProducts />} />

              {/* Kids product details page */}
              <Route path="product/:id" element={<KidsProductDetailPage />} />
            </Route>


            {/* Checkout and Account */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account" element={<AccountPage />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <Chatbot />
      <Sidebar />


      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
