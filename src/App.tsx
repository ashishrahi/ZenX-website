import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import MainLayout from "./components/MainLayout";
import KidsPage from "./pages/Kids/KidsPage";
import KidsProductDetailPage from "./pages/Kids/KidsProductDetails/KidsProductDetailsPage";
import LoadingPage from "./components/LoadingPage";
import Sidebar from "./components/Sidebar";
import MenProductDetailPage from "./pages/Men/ProductDetailPage/MenProductDetailPage";
import MenCategoryProductPage from "./pages/Men/MenCategoryProduct/MenCategoryProductPage";
import WomenCategoryProductsPage from './pages/Women/WonenCategoryProductPage'
import KidsCategoryProductsPage from './pages/Kids/KidsCategoryProductPage'
import FAQSectionPage from "./pages/FAQSection/FAQSectionPage";
import CountryExportPage from "./pages/CountryExport/CountryExportPage";
import ScrollToTop from "./components/ScrollToTop";
import ZenHistoryPage from "./pages/ZenHistory/ZenHistoryPage";

// ✅ Lazy loading for better performance
const Index = lazy(() => import("./pages/Home/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
        <ScrollToTop />
        {/* Global Header */}
        <Header />

        {/* Suspense ensures that while components are loading, fallback UI is shown */}
        <Suspense fallback={<LoadingPage title="Loading" />}>
          <Routes>
            {/* ✅ Wrap all pages under MainLayout */}
            <Route element={<MainLayout />}>
              {/* Home */}
              <Route path="/" element={<Index />} />

              {/* Faq */}
              <Route path="/faq" element={<FAQSectionPage />} />
              {/* Blog */}
              <Route path="/blog" element={<BlogPage />} />
              {/* Export */}

              <Route path="/export" element={<CountryExportPage />} />
              {/* history */}
              <Route path="/history" element={<ZenHistoryPage />} />




              {/* MEN */}
              <Route path="/men">
                <Route index element={<MenPage />} />
                <Route path="category/:slug" element={<MenCategoryProductPage />} />
                <Route path="product/:slug" element={<MenProductDetailPage />} />
              </Route>

              {/* WOMEN */}
              <Route path="/women">
                <Route index element={<WomenPage />} />
                <Route path="category/:slug" element={<WomenCategoryProductsPage />} />
                <Route path="product/:id" element={<WomenProductDetailsPage />} />
              </Route>

              {/* KIDS */}
              <Route path="/kid">
                <Route index element={<KidsPage />} />
                <Route path="category/:slug" element={<KidsCategoryProductsPage />} />
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
        {/* <ScrollToBottom/> */}
        <Chatbot />
        <Sidebar
          title={"LIFETIME PERFORMANCE WARRANTY"}
        />


      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
