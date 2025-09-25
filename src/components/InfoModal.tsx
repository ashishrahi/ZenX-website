import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { IconButton } from "./Header"; // Reuse the same IconButton
import { useContacts } from "@/hooks/Contacts";

export interface ContactInfo {
  title: string;
  address?: string;
  cin?: string;
  email?: string;
  phone?: string;
  timing?: string;
  colspan?: number; // for full width in grid
}

interface InfoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ open, setOpen }) => {
  const { data: contactData } = useContacts();

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
          {contactData?.map((item, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition ${
                item?.colspan ? "md:col-span-2" : ""
              }`}
            >
              <h3 className="font-semibold text-lg mb-2">{item?.title ?? "No Title"}</h3>
              {item?.address && <p className="text-sm text-gray-700">{item.address}</p>}
              {item?.cin && <p className="text-sm mt-2 font-medium">CIN: {item.cin}</p>}
              {item?.email && (
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
              {item?.phone && <p className="mt-1">📞 {item.phone}</p>}
              {item?.timing && <p className="text-xs text-gray-500">{item.timing}</p>}
            </div>
          )) ?? <p className="col-span-2 text-center text-gray-500">No contact info available.</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
