"use client";

import { Dispatch, forwardRef, SetStateAction, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { XIcon } from "lucide-react";
import { Badge } from "../ui/badge";

type InputTagsProps = React.ComponentProps<"input"> & {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
};

const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ onChange, value, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState("");
    const [focused, setFocused] = useState(false);

    function addPendingDataPoint() {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    }

    const { setFocus } = useFormContext();

    return (
      <div
        className={cn(
          "flex min-h-[20px] w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          focused
            ? "ring-offse-2 outline-none ring-2 ring-ring"
            : "outline-none ring-0 ring-ring ring-offset-0",
        )}
        onClick={() => setFocus("tags")}
      >
        <motion.div className="flex min-h-[2.5rem] flex-wrap items-center gap-2 rounded-md p-2">
          <AnimatePresence>
            {value.map((tag) => (
              <motion.div
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                key={tag}
              >
                <Badge variant={"secondary"}>{tag}</Badge>
                <button
                  className="ml-2 w-3"
                  onClick={() => onChange(value.filter((i) => i !== tag))}
                >
                  <XIcon className="w-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="flex">
            <Input
              className="border-transparent focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Add Tags"
              value={pendingDataPoint}
              onFocus={(e) => setFocused(true)}
              onBlurCapture={(e) => setFocused(false)}
              onChange={(e) => setPendingDataPoint(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addPendingDataPoint();
                }
                if (
                  e.key === "Backspace" &&
                  !pendingDataPoint &&
                  value.length > 0
                ) {
                  e.preventDefault();
                  const newValue = [...value];
                  newValue.pop();
                  onChange(newValue);
                }
              }}
              {...props}
            />
          </div>
        </motion.div>
      </div>
    );
  },
);

InputTags.displayName = "InputTags";

export default InputTags;
