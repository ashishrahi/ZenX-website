import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface AccountProfileProps {
  initialName?: string;
  initialPhone?: string;
}

const AccountProfile: React.FC<AccountProfileProps> = ({
  initialName = "Ashish Rahi",
  initialPhone = "+919889157407",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);

  const handleSave = () => {
    console.log("Profile updated:", { fullName, phone });
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-[#2f2b2b] text-white">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-2 rounded w-full text-black"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 rounded w-full text-black"
          />
          <div className="flex gap-2 mt-2">
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">{fullName}</h2>
            <p className="text-sm opacity-80 mt-1">{`Logged in via ${phone}`}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-white/90 underline"
          >
            EDIT
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountProfile;
