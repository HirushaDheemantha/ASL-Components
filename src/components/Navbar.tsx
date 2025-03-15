"use client";

import { useCallback } from "react";
import { Globe, GraduationCap } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Navbar({
  product,
  setProduct,
}: {
  product: string;
  setProduct: (value: string) => void;
}) {
  const handleProductChange = useCallback(
    (value: string) => {
      setProduct(value);
      console.log("Value set in Navbar:", value);
    },
    [setProduct]
  );

  return (
    <nav className="p-4 flex flex-wrap items-center justify-between bg-blue-600 text-white">
      {/* Left: Product Selection Dropdown */}
      <div className="flex items-center">
        <Select onValueChange={handleProductChange} value={product}>
          <SelectTrigger className="w-[220px] bg-white text-black rounded-md shadow-md">
            <SelectValue placeholder="Select Product" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black rounded-md shadow-lg">
            <SelectItem value="volunteer" className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              Global Volunteer
            </SelectItem>
            <SelectItem value="talent/teacher" className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4" />
              Global Talent/Teacher
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Center: Dashboard Title (Responsive) */}
      <h1 className="text-lg font-bold text-center flex-1 md:text-xl">
        AIESEC SRI LANKA OPS DASHBOARD
      </h1>
    </nav>
  );
}
