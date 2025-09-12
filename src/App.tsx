import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Products from "./components/Products";
import ProductDetailsPage from "./pages/ProductDetailPage/ProductDetailPage";
import CheckoutPage from "../src/pages/CheckoutPage/CheckoutPage";
import AccountPage from "./pages/Account/AccountPage";
import MenPage from "./pages/Men/MenPage";
import BlogPage from "./pages/BlogPage/BlogPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>

        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mens" element={<MenPage />} />
          <Route path="/kids" element={<Index />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/faq" element={<Index />} />


          <Route path="/category/:slug" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />



          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
