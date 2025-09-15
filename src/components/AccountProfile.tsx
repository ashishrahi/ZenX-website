import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import images from "@/assets/men/images";
import AppButton from "./AppComponent/AppButton";

interface InnerwareProfileProps {
  initialName?: string;
  initialEmail?: string;
  initialPhone?: string;
  initialRole?: string;
  initialAddress?: string;
  initialStatus?: string;
  initialAvatar?: string;
}

const InnerwareProfile: React.FC<InnerwareProfileProps> = ({
  initialName = "Demo Alice",
  initialEmail = "alice@example.com",
  initialPhone = "+91 9888888888",
  initialRole = "Demo Job",
  initialAddress = "123, Main Street, Delhi, India",
  initialStatus = "Active",
  initialAvatar = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [role, setRole] = useState(initialRole);
  const [address, setAddress] = useState(initialAddress);
  const [status, setStatus] = useState(initialStatus);
  const [avatar, setAvatar] = useState(initialAvatar);

  const handleSave = () => {
    console.log("Profile saved:", { fullName, email, phone, role, address, status, avatar });
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const statusColor = status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Avatar */}
        <div className="relative group">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gradient-to-tr from-blue-400 to-purple-600 p-1">
            <motion.img
              src={avatar || images.Women}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
              whileHover={{ scale: 1.1 }}
            />
          </div>
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
            />
          )}
        </div>

        {isEditing ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col gap-3 mt-2">
            {[
              { label: "Full Name", value: fullName, set: setFullName, type: "text" },
              { label: "Email", value: email, set: setEmail, type: "email" },
              { label: "Phone", value: phone, set: setPhone, type: "text" },
              { label: "Role / Department", value: role, set: setRole, type: "text" },
              { label: "Address", value: address, set: setAddress, type: "text" },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">{field.label}</label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="flex gap-3 mt-4 justify-center">
              <AppButton size="small" className="bg-primary hover:bg-primary-700" onClick={handleSave}>
                Save
              </AppButton>
              <AppButton size="small" className="bg-black"  onClick={() => setIsEditing(false)}>
                Cancel
              </AppButton>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col gap-3 mt-2 items-center text-center">
            <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
            <p className="text-sm text-gray-500 flex items-center gap-2"><FiMail /> {email}</p>
            <p className="text-sm text-gray-500 flex items-center gap-2"><FiPhone /> {phone}</p>
            <p className="text-sm text-gray-500">Role: {role}</p>
            <p className="text-sm text-gray-500">Address: {address}</p>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>{status}</div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4 mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition">
                <FiMail size={20} />
              </a>
              <a href={`https://wa.me/${phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 transition">
                <FaWhatsapp size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition">
                <FaLinkedin size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black transition">
                <FaGithub size={20} />
              </a>
            </motion.div>

            <AppButton
              size = "small"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </AppButton>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default InnerwareProfile;
