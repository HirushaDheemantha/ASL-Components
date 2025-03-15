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
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./DatePickerWithRange"; // Correct import!

export default function DashboardFilters({ product }: { product: string }) {
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

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    console.log("Selected Date Range in DashboardFilters:", newDateRange);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-center justify-center md:justify-between">
      {/* Entity Selection */}
      <div className="w-full sm:w-auto">
        {" "}
        {/* Added wrapper div for width control */}
        <Select>
          <SelectTrigger className="w-full sm:w-48">
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
      </div>

      {/* Date Picker */}
      <div className="w-full sm:w-auto">
        <DatePickerWithRange
          value={dateRange}
          onChange={handleDateRangeChange}
        />
      </div>

      {/* Functions Selection */}
      <div className="w-full sm:w-auto">
        <Select onValueChange={handleFunctionSelect}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Functions" />
          </SelectTrigger>
          <SelectContent>
            {product === "volunteer"
              ? v_products.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))
              : product === "talent/teacher"
              ? t_products.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))
              : null}
          </SelectContent>
        </Select>
      </div>

      {/* Status Selection */}
      <div className="w-full sm:w-auto">
        <Select className="w-full sm:w-32">
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project Filter */}
      {showProjectFilter && (
        <div className="w-full sm:w-auto">
          {" "}
          {/* Added wrapper div for width control */}
          <Select className="w-full sm:w-32">
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder={projectLabel} />
            </SelectTrigger>
            <SelectContent>
              {product === "volunteer"
                ? gv_projects.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))
                : product === "talent/teacher"
                ? t_projects.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* MC Selection */}
      <div className="w-full sm:w-auto">
        {" "}
        {/* Added wrapper div for width control */}
        <Select>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder={mcLabel} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mc1">MC 1</SelectItem>
            <SelectItem value="mc2">MC 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* LC Selection */}
      <div className="w-full sm:w-auto">
        {" "}
        {/* Added wrapper div for width control */}
        <Select>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder={lcLabel} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lc1">LC 1</SelectItem>
            <SelectItem value="lc2">LC 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Duration Filter (Hidden for Global Volunteer) */}
      {product !== "volunteer" && (
        <div className="w-full sm:w-auto">
          {" "}
          {/* Added wrapper div for width control */}
          <Select>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="long">Long</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
