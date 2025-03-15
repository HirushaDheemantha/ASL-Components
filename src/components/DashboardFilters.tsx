"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./DatePickerWithRange"; // Correct import!

export default function DashboardFilters({ product }: { product: string }) {
  // We only need the dateRange state here if DashboardFilters needs to directly *use* the selected date range for its own logic, otherwise, you can even remove this. For now, let's keep it and assume DashboardFilters might need access to it.
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
  );
  const [selectedFunction, setSelectedFunction] = React.useState<string | null>(
    null
  );

  const t_products = ["oGTa", "iGTa", "oGTe", "iGTe"];
  const v_products = ["oGV", "iGV"];

  const t_projects = [
    "Information Technology",
    "Engineering",
    "Business Developement",
    "Marketing",
    "Teaching",
    "Other",
  ];

  const gv_projects = [
    "Heartbeat",
    "Fingerprint",
    "Global Classroom",
    "Discover",
    "Happy Bus",
    "Youth 4 Impact",
    "Raise Your Voice",
    "Skill Up!",
    "On The Map",
    "Equify",
    "Eco City",
    "Eat 4 Change",
    "Green Leaders",
    "Aquatica",
    "Explorer",
    "Rooted",
    "Myself, My World",
    "Scale Up!",
  ];

  const handleFunctionSelect = (value: string) => {
    setSelectedFunction(value);
  };

  const showProjectFilter = !(
    selectedFunction === "iGTe" || selectedFunction === "oGTe"
  );

  const isInternal =
    selectedFunction === "iGV" ||
    selectedFunction === "iGTa" ||
    selectedFunction === "iGTe";

  const isTalentTeacher = product === "talent/teacher";

  const mcLabel = isInternal ? "Home MC" : "Host MC";
  const lcLabel = isInternal ? "Home LC" : "Host LC";
  const projectLabel = isTalentTeacher ? "Workfield" : "Project";

  // Function to handle date range changes from DatePickerWithRange
  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange); // Update the dateRange state in DashboardFilters (if needed)
    console.log("Selected Date Range in DashboardFilters:", newDateRange);
    // *** Here is where you would typically perform filtering logic based on the date range! ***
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-center justify-between">
      <Select>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Local Entity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cc">CC</SelectItem>
          <SelectItem value="cn">CN</SelectItem>
          <SelectItem value="cs">CS</SelectItem>
          <SelectItem value="kandy">Kandy</SelectItem>
          <SelectItem value="nibm">NIBM</SelectItem>
          <SelectItem value="nsbm">NSBM</SelectItem>
          <SelectItem value="rajarata">Rajarata</SelectItem>
          <SelectItem value="ruhuna">Ruhuna</SelectItem>
          <SelectItem value="sliit">SLIIT</SelectItem>
        </SelectContent>
      </Select>

      {/* Integrate DatePickerWithRange Component */}
      <DatePickerWithRange
        value={dateRange} // Pass the dateRange state (if needed)
        onChange={handleDateRangeChange} // Pass the handler function
      />

      <Select onValueChange={handleFunctionSelect}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Functions" />
        </SelectTrigger>
        <SelectContent>
          {product === "volunteer"
            ? v_products.map((product) => (
                <SelectItem key={product} value={product}>
                  {product}
                </SelectItem>
              ))
            : product === "talent/teacher"
            ? t_products.map((product) => (
                <SelectItem key={product} value={product}>
                  {product}
                </SelectItem>
              ))
            : null}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      {showProjectFilter && (
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder={projectLabel} />
          </SelectTrigger>
          <SelectContent>
            {product === "volunteer"
              ? gv_projects.map((project) => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))
              : product === "talent/teacher"
              ? t_projects.map((project) => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))
              : null}
          </SelectContent>
        </Select>
      )}

      <Select>
        <SelectTrigger className="w-32">
          <SelectValue placeholder={mcLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mc1">MC 1</SelectItem>
          <SelectItem value="mc2">MC 2</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-32">
          <SelectValue placeholder={lcLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="lc1">LC 1</SelectItem>
          <SelectItem value="lc2">LC 2</SelectItem>
        </SelectContent>
      </Select>

      {/* Hide Duration filter when Global Volunteer is selected */}
      {product !== "volunteer" && (
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short</SelectItem>
            <SelectItem value="long">Long</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
