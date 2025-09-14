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
       <Suspense fallback={<LoadingPage />}>
  <Routes>
    {/* ✅ Wrap all pages under MainLayout */}
    <Route element={<MainLayout />}>
      {/* Home */}
      <Route path="/" element={<Index />} />

      {/* Blog */}
      <Route path="/blog" element={<BlogPage />} />

      {/* MEN */}
      <Route path="/mens">
        <Route index element={<MenPage />} />
        <Route path="category/:slug" element={<MenCategoryProducts />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
      </Route>

      {/* WOMEN */}
      <Route path="/womens">
        <Route index element={<WomenPage />} />
        <Route path="category/:slug" element={<WomenCategoryProducts />} />
        <Route path="product/:id" element={<WomenProductDetailsPage />} />
      </Route>

      {/* KIDS */}
      <Route path="/kids">
        <Route index element={<KidsPage />} />
        <Route path="category/:slug" element={<KidsCategoryProducts />} />
        <Route path="product/:id" element={<KidsProductDetailPage />} />
      </Route>

      {/* Checkout and Account */}
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/account" element={<AccountPage />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Route>
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
