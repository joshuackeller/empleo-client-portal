import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Button } from "./Button";
import { cn } from "@/src/utilities/cn";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./Calendar";
import { format } from "date-fns";

interface DatePickerProps {
  value: any;
  onChange: (value: Date | undefined) => any;
}

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  let currentDate = new Date();
  currentDate.setDate(new Date().getDate() - 1);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "pl-3 text-left font-normal w-full",
            !value && "text-muted-foreground"
          )}
        >
          {value ? format(value, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) => date < currentDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
