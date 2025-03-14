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
import { DatePickerWithRange } from "./DatePickerWithRange";

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
  const v_projects = [
    "Volunteering Project1",
    "Volunteering Project2",
    "Volunteering Project3",
    "Volunteering Project4",
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

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex gap-4 items-center justify-between">
      <Select>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Local Entity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sri_lanka">AIESEC Sri Lanka</SelectItem>
          <SelectItem value="global">Global AIESEC</SelectItem>
        </SelectContent>
      </Select>

      <DatePickerWithRange value={dateRange} onChange={setDateRange} />

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
              ? v_projects.map((project) => (
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
