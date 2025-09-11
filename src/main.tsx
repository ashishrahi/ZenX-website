import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "keen-slider/keen-slider.min.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CartProvider } from "./context/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
    <CartProvider>
        <App />
    </CartProvider>

);
