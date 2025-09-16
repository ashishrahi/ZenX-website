import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface ProfileData {
  name?: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: "Male" | "Female" | "Other";
}

interface ProfileFormProps {
  user?: ProfileData;
  onSave: (data: ProfileData) => void;
  onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState<ProfileData>(user ?? {});

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="max-w-3xl mx-auto p-6 rounded-2xl shadow-md bg-card">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{formData?.name ?? "No Name"}</h2>
        <p className="text-sm text-muted-foreground">
          Logged in via <span className="font-medium">+91{formData?.phone ?? "---------"}</span>
        </p>
      </div>

      {/* Section Title */}
      <div className="relative mb-6 flex items-center">
        <span className="text-base font-medium px-3 bg-card z-10">Basic</span>
        <div className="flex-1 border-t border-border absolute left-0 right-0"></div>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name*</label>
            <Input
              value={formData?.name ?? ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Id</label>
            <Input value={formData?.email ?? ""} readOnly />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <Input
              type="date"
              value={formData?.dob ?? ""}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <Input value={formData?.phone ?? ""} readOnly />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <div className="flex gap-3">
            {["Male", "Female", "Other"].map((g) => (
              <Button
                key={g}
                type="button"
                variant={formData?.gender === g ? "default" : "outline"}
                className="rounded-md px-6"
                onClick={() => handleChange("gender", g)}
              >
                {g.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            className="w-1/2 mr-3 border-muted-foreground/40 text-muted-foreground"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-1/2 bg-gradient-to-r from-gray-700 to-black text-white"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileForm;
