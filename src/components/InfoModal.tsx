import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { IconButton } from "./Header"; // Reuse the same IconButton

// Button is not needed here as trigger is IconButton
// import { Button } from "@/components/ui/button";

// Contact data object
interface ContactInfo {
  title: string;
  address?: string;
  cin?: string;
  email?: string;
  phone?: string;
  timing?: string;
  colspan?: number; // for full width in grid
}

const contactData: ContactInfo[] = [
  {
    title: "Corporate Office",
    address: "ZenX Industries Limited, Cessna Business Park, Umiya Business Bay-Tower-1, 7th Floor, Kanpur, Uttar Pradesh, India, 560103.",
    cin: "L18101KA1994PLC016554",
    email: "wecare@ZenX.com",
    phone: "1800-572-1299 / 1860-425-3333",
    timing: "Mon-Sun, 10:00 AM - 7:00 PM",
  },
  {
    title: "For Purchase Related Queries",
    address: "ZenX Industries Limited, Cessna Business Park, Umiya Business Bay-Tower-1, 3rd Floor, Kanpur, Uttar Pradesh, India, 560103.",
    cin: "L18101KA1994PLC016554",
    email: "wecare@jockeyindia.com",
    phone: "1800-572-1299 / 1860-425-3333",
    timing: "Mon-Sun, 10:00 AM - 7:00 PM",
  },
  {
    title: "To Apply for: Franchisee (Exclusive Outlet)",
    email: "franchisee@ZenX.com",
    phone: "1800-572-1299",
  },
  {
    title: "To Apply for: Distributorship",
    email: "wecare@ZenXindia.com",
    phone: "1800-572-1299",
  },
  {
    title: "Grievance Officer",
    address: "Zen-X Industries Limited, Cessna Business Park, Umiya Business Bay-Tower-1, 3rd Floor, Kanpur, Uttar Pradesh, India, 560103.",
    colspan: 2,
  },
];

interface InfoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IconButton>
          <Info size={25} />
        </IconButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto rounded-lg p-6 transition-transform duration-300 ease-in-out">
        <DialogTitle className="text-2xl font-bold">Get in Touch</DialogTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {contactData.map((item, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition ${
                item.colspan ? "md:col-span-2" : ""
              }`}
            >
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              {item.address && <p className="text-sm text-gray-700">{item.address}</p>}
              {item.cin && <p className="text-sm mt-2 font-medium">CIN: {item.cin}</p>}
              {item.email && (
                <p className="mt-2">
                  📧{" "}
                  <a
                    href={`mailto:${item.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item.email}
                  </a>
                </p>
              )}
              {item.phone && <p className="mt-1">📞 {item.phone}</p>}
              {item.timing && <p className="text-xs text-gray-500">{item.timing}</p>}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
