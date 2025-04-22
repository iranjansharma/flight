"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import toast, { Toaster } from "react-hot-toast";

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

import debounce from "lodash.debounce";

export default function FlightSearchForm() {
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const fetchSuggestions = async (query, type) => {
    if (query.length < 2) {
      if (type === "from") setFromSuggestions([]);
      else setToSuggestions([]);
      return;
    }

    try {
      const res = await fetch(`/api/destination/search?q=${query}`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();
      if (!Array.isArray(data?.data)) {
        // toast.error("Unexpected response format");
        // console.error("Unexpected response format:", data);
        return;
      }

      const suggestions = data.data
        .map((item) => {
          if (!item.cityName || !item.countryName || !item.code) {
            // console.warn("Skipping invalid item:", item);
            // toast.error("Invalid suggestion data");
            return null;
          }
          return {
            id: item.id,
            name: `${item.cityName}, ${item.countryName}`,
            iata: item.code,
          };
        })
        .filter(Boolean);

      if (type === "from") setFromSuggestions(suggestions);
      else setToSuggestions(suggestions);
    } catch (error) {
      toast.error("Error fetching suggestions");
      // console.error("Error fetching suggestions:", error);
    }
  };

  // Debounce the fetchSuggestions function
  const debouncedFetchFromSuggestions = debounce(
    (query) => fetchSuggestions(query, "from"),
    1000
  );
  const debouncedFetchToSuggestions = debounce(
    (query) => fetchSuggestions(query, "to"),
    1000
  );

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFrom(value);
    fetchSuggestions(value, "from");
    debouncedFetchFromSuggestions(value);
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);
    fetchSuggestions(value, "to");
    debouncedFetchToSuggestions(value);
  };

  const handleFromSelect = (suggestion) => {
    setFrom(suggestion);
    setFromSuggestions([]);
  };

  const handleToSelect = (suggestion) => {
    setTo(suggestion);
    setToSuggestions([]);
  };

  const handleSearch = () => {
    if (!from) {
      toast.error("Please select From.");
      return;
    } else if (!to) {
      toast.error("Please select To.");
      return;
    }
    console.log({ from, to });
  };

  return (
    <div>
      <Toaster position="top-right" />
      {/* From and To Fields */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="flex flex-col flex-1">
          <Label htmlFor="from" className="text-base">
            From
          </Label>
          <Input
            onChange={handleFromChange}
            id="from"
            value={from}
            placeholder="Departure"
            className="h-12 text-base transition-transform duration-200 hover:scale-[1.02] bg-background border-border"
          />
          {fromSuggestions.length > 0 && (
            <ul className="w-fit mt-20 absolute z-10 bg-white border rounded shadow-md max-h-48 overflow-y-hidden">
              {fromSuggestions.map((sug) => (
                <li
                  key={sug.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleFromSelect(`${sug.name} (${sug.iata})`)}
                >
                  {sug.name} ({sug.iata})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col flex-1">
          <Label htmlFor="to" className="text-base">
            To
          </Label>
          <Input
            onChange={handleToChange}
            value={to}
            id="to"
            placeholder="Destination"
            className="h-12 text-base transition-transform duration-200 hover:scale-[1.02] bg-background border-border"
          />
          {toSuggestions.length > 0 && (
            <ul className="w-fit mt-20 absolute z-10 bg-white border rounded shadow-md max-h-48 overflow-y-hidden">
              {toSuggestions.map((sug) => (
                <li
                  key={sug.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleToSelect(`${sug.name} (${sug.iata})`)}
                >
                  {sug.name} ({sug.iata})
                </li>
              ))}
            </ul>
          )}
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
        <Button
          className="bg-[#31a539] text-primary-foreground h-12 !px-14 text-base transition-transform duration-200 hover:scale-[1.05]"
          onClick={handleSearch}
        >
          <SearchCheck /> Search
        </Button>
      </div>
    </div>
  );
}
