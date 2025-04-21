"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, SearchCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function FlightSearchForm() {
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();

  return (
    // <div className="min-h-screen bg-background flex items-center justify-center p-6">
    // className="bg-card text-card-foreground rounded-2xl shadow-xl p-8 w-full max-w-5xl space-y-6"
    <div>
      {/* From and To Fields */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="flex flex-col flex-1">
          <Label htmlFor="from" className="text-base">
            From
          </Label>
          <Input
            id="from"
            placeholder="Departure"
            className="h-12 text-base transition-transform duration-200 hover:scale-[1.02] bg-background border-border"
          />
        </div>
        <div className="flex flex-col flex-1">
          <Label htmlFor="to" className="text-base">
            To
          </Label>
          <Input
            id="to"
            placeholder="Destination"
            className="h-12 text-base transition-transform duration-200 hover:scale-[1.02] bg-background border-border"
          />
        </div>
      </div>

      {/* Bottom Row: Departure, Return, Passengers, Children, Class */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="flex flex-col">
          <Label className="text-base">Departure</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-12 text-[11px] justify-start text-left bg-background border-border transition-transform duration-200 hover:scale-[1.02]",
                  !departureDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="h-4 w-4" />
                {departureDate ? format(departureDate, "PPP") : "D Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" forceMount>
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col">
          <Label className="text-base">Return</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-12 text-[11px] justify-start text-left bg-background border-border transition-transform duration-200 hover:scale-[1.02]",
                  !returnDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="h-4 w-4" />
                {returnDate ? format(returnDate, "PPP") : "R Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" forceMount>
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col ">
          <Label className="text-base">Passengers</Label>
          <Select defaultValue="1">
            <SelectTrigger className="!h-12 w-auto text-base bg-background border-border transition-transform duration-200 hover:scale-[1.02]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(10).keys()].map((i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <Label className="text-base">Children</Label>
          <Select defaultValue="0">
            <SelectTrigger className="!h-12 w-auto text-base bg-background border-border transition-transform duration-200 hover:scale-[1.02]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(10).keys()].map((i) => (
                <SelectItem key={i} value={i.toString()}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <Label className="text-base">Class</Label>
          <Select>
            <SelectTrigger className="!h-12 w-auto text-base bg-background border-border transition-transform duration-200 hover:scale-[1.02]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="first">First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button className="bg-[#31a539] text-primary-foreground h-12 !px-14 text-base transition-transform duration-200 hover:scale-[1.05]">
          <SearchCheck /> Search
        </Button>
      </div>
    </div>
    // {/* </div> */}
  );
}
