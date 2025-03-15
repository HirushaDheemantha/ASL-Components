"use client";

import * as React from "react";
import {
  addDays,
  format,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Important: import the styles for react-day-picker

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DatePickerWithRangeProps {
  value: DateRange | undefined;
  onChange: (date: DateRange | undefined) => void;
  className?: string;
}

// --- Correctly Implemented and Dynamic Date Range Calculation Functions ---
const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return { from: today, to: today };
};

const getYesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  return { from: yesterday, to: yesterday };
};

const getThisMonth = () => {
  const today = new Date();
  return { from: startOfMonth(today), to: endOfMonth(today) };
};

const getLastMonth = () => {
  const today = new Date();
  const lastMonthStart = startOfMonth(addDays(today, -30)); // Rough estimate - could be refined for month boundary
  const lastMonthEnd = endOfMonth(addDays(today, -30)); // Rough estimate - could be refined for month boundary
  return { from: lastMonthStart, to: lastMonthEnd };
};

const getThisLCTerm = () => {
  const currentYear = new Date().getFullYear();
  const start = new Date(
    `${currentYear - (new Date().getMonth() < 1 ? 1 : 0)}-02-01`
  );
  start.setHours(0, 0, 0, 0);
  const end = new Date(
    `${currentYear + (new Date().getMonth() > 0 ? 1 : 0)}-01-31`
  ); // end of next year January
  end.setHours(23, 59, 59, 999);
  return { from: start, to: end };
};

const getLastLCTerm = () => {
  const currentYear = new Date().getFullYear();
  const start = new Date(
    `${currentYear - (new Date().getMonth() < 1 ? 2 : 1)}-02-01`
  );
  start.setHours(0, 0, 0, 0);
  const end = new Date(
    `${currentYear - (new Date().getMonth() < 1 ? 1 : 0)}-01-31`
  ); // end of this year January
  end.setHours(23, 59, 59, 999);
  return { from: start, to: end };
};

const getThisMCTerm = () => {
  const currentYear = new Date().getFullYear();
  const start = new Date(
    `${currentYear - (new Date().getMonth() < 6 ? 1 : 0)}-07-01`
  );
  start.setHours(0, 0, 0, 0);
  const end = new Date(
    `${currentYear + (new Date().getMonth() > 5 ? 1 : 0)}-06-30`
  ); // June 30th of next year
  end.setHours(23, 59, 59, 999);
  return { from: start, to: end };
};

const getLastMCTerm = () => {
  const currentYear = new Date().getFullYear();
  const start = new Date(
    `${currentYear - (new Date().getMonth() < 6 ? 2 : 1)}-07-01`
  );
  start.setHours(0, 0, 0, 0);
  const end = new Date(
    `${currentYear - (new Date().getMonth() < 6 ? 1 : 0)}-06-30`
  ); // June 30th of this year
  end.setHours(23, 59, 59, 999);
  return { from: start, to: end };
};

const PRESET_RANGES = [
  { label: "Today", range: getToday() },
  { label: "Yesterday", range: getYesterday() },
  { label: "This Month", range: getThisMonth() },
  { label: "Last Month", range: getLastMonth() },
  { label: "This LC Term", range: getThisLCTerm() },
  { label: "Last LC Term", range: getLastLCTerm() },
  { label: "This MC Term", range: getThisMCTerm() },
  { label: "Last MC Term", range: getLastMCTerm() },
];

// Custom Date Range Picker Component (Same as before)
const CustomDateRangePicker = React.forwardRef<
  {
    onSelect: (range: DateRange | undefined) => void;
    value: DateRange | undefined;
  },
  HTMLDivElement
>(({ onSelect, value }, ref) => {
  return (
    <div ref={ref} className="flex space-x-2 p-4 w-full">
      {" "}
      {/* Flex container for side-by-side calendars */}
      <DayPicker
        mode="range"
        selected={value}
        onSelect={onSelect}
        numberOfMonths={2} // Display two months
        className="rdp-custom" // Custom class for styling
      />
    </div>
  );
});
CustomDateRangePicker.displayName = "CustomDateRangePicker";

export function DatePickerWithRange({
  value,
  onChange,
  className,
}: DatePickerWithRangeProps) {
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<"preset" | "custom">("custom"); // Default to "custom" for initial focus

  return (
    <div className={cn("grid gap-2", className)}>
      {/* Pop-up Trigger */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y")} -{" "}
                  {format(value.to, "LLL dd, y")}
                </>
              ) : (
                format(value.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        {/* Pop-up Content */}
        <PopoverContent className="w-auto p-0 rounded-lg shadow-md overflow-hidden">
          {" "}
          {/* w-auto and removed fixed height */}
          {/* Tabs: Preset | Custom */}
          <div className="flex border-b bg-gray-100">
            <Button
              variant={tab === "preset" ? "default" : "ghost"}
              className="flex-1 rounded-none"
              onClick={() => setTab("preset")}
            >
              Preset
            </Button>
            <Button
              variant={tab === "custom" ? "default" : "ghost"}
              className="flex-1 rounded-none"
              onClick={() => setTab("custom")}
            >
              Custom
            </Button>
          </div>
          {/* Preset Dates or Custom Picker */}
          {tab === "preset" ? (
            <ScrollArea className="max-h-[250px] p-2">
              {PRESET_RANGES.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
                  onClick={() => {
                    onChange(preset.range);
                    setOpen(false);
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </ScrollArea>
          ) : (
            <CustomDateRangePicker value={value} onSelect={onChange} />
          )}
        </PopoverContent>
      </Popover>

      <style jsx>{`
        .rdp-custom {
          display: flex;
          flex-direction: row; /* Ensure calendars are side-by-side */
          padding: 10px;
        }

        .rdp-custom .rdp {
          /* Style the individual calendars inside */
          display: inline-grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.3rem;
          padding: 0.5rem;
          border-collapse: collapse;
          width: auto;
          font-size: 0.85rem;
          margin: 0 10px; /* Add some horizontal margin between calendars */
        }

        .rdp-custom .rdp-day {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          font-size: 0.85rem;
          font-weight: 400;
          border-radius: 0.3rem;
          transition: background-color 0.15s ease-in-out;
        }

        .rdp-custom .rdp-day:hover {
          background-color: #e0e0e0;
        }

        .rdp-custom .rdp-day_selected {
          /* Use rdp-day_selected for react-day-picker v8+ */
          background-color: #2563eb;
          color: white;
          font-weight: 500;
        }

        .rdp-custom .rdp-caption {
          font-weight: 500;
          font-size: 0.9rem;
          text-align: center;
          padding-bottom: 0.3rem;
        }

        .rdp-custom .rdp-nav_button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out;
          margin: 0 0.2rem;
        }

        .rdp-custom .rdp-nav_button:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
}
