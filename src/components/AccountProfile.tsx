"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGenders } from "@/hooks/Genders/useGenders";
import { registerUser } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";

// Validation schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
  dob: z.string().optional().or(z.literal("")),
  genderId: z.string().optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface Gender {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob?: string;
  genderId?: string;
}

interface ProfileFormProps {
  user?: User;
  onCancel: () => void;
  onSuccess?: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = React.memo(({ user, onCancel, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = React.useState(false);
  const { data: genders = [] } = useGenders();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      dob: user?.dob ?? "",
      genderId: user?.genderId ?? "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);
    try {
      await dispatch(registerUser(values)).unwrap();
      onSuccess?.();
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (val: string) => void) => {
    const formattedValue = e.target.value.replace(/\D/g, "");
    onChange(formattedValue);
  };

  return (
    <Card className="max-w-3xl mx-auto p-6 rounded-2xl shadow-md bg-card">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{form.watch("name") || "No Name"}</h2>
        <p className="text-sm text-muted-foreground">Profile Information</p>
      </div>

      <div className="relative mb-6 flex items-center">
        <span className="text-base font-medium px-3 bg-card z-10">Basic Details</span>
        <div className="flex-1 border-t border-border absolute left-0 right-0"></div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name*</FormLabel>
                  <FormControl>
                    <Input {...field} id="name" placeholder="Enter your full name" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email Address*</FormLabel>
                  <FormControl>
                    <Input {...field} id="email" type="email" placeholder="Enter your email" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth */}
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel htmlFor="dob">Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          id="dob"
                          variant="outline"
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          disabled={isLoading}
                        >
                          {field.value ? format(new Date(field.value), "PPP") : <span>Select your date of birth</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone">Phone Number*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      disabled={isLoading}
                      onChange={(e) => handlePhoneChange(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Gender */}
          <FormField
            control={form.control}
            name="genderId"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(val === "none" ? "" : val)}
                  value={field.value || "none"}
                  disabled={isLoading}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Not specified</SelectItem>
                    {genders.map((gender: Gender) => (
                      <SelectItem key={gender.id} value={gender.id}>
                        {gender.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex justify-between pt-6 gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-muted-foreground/40 text-muted-foreground"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !form.formState.isDirty}
              className="flex-1 bg-gradient-to-r from-gray-700 to-black text-white relative"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
});

ProfileForm.displayName = "ProfileForm";

export default ProfileForm;
