"use client";

import * as React from "react";
import { cn } from "./utils";

export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ 
    className, 
    value, 
    defaultValue, 
    onValueChange = () => {}, 
    min = 0, 
    max = 100, 
    step = 1,
    disabled = false,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState<number[]>(
      value || defaultValue || [min]
    );

    const currentValue = value || internalValue;

    const handleChange = (index: number, newValue: number) => {
      if (disabled) return;
      
      const newValues = [...currentValue];
      newValues[index] = Math.max(min, Math.min(max, newValue));
      setInternalValue(newValues);
      onValueChange(newValues);
    };

    const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full touch-none items-center select-none",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {/* Track */}
        <div className="relative w-full h-2 bg-muted rounded-full">
          {/* Range */}
          <div
            className="absolute h-full bg-primary rounded-full"
            style={{
              left: `${getPercentage(Math.min(...currentValue))}%`,
              width: `${getPercentage(Math.max(...currentValue)) - getPercentage(Math.min(...currentValue))}%`
            }}
          />
          
          {/* Thumbs */}
          {currentValue.map((val, index) => (
            <div
              key={index}
              className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full shadow-sm cursor-pointer hover:scale-110 transition-transform"
              style={{ left: `${getPercentage(val)}%` }}
              onMouseDown={(e) => {
                if (disabled) return;
                const handleMouseMove = (e: MouseEvent) => {
                  const rect = e.currentTarget?.parentElement?.getBoundingClientRect();
                  if (!rect) return;
                  const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                  const newValue = min + (percentage / 100) * (max - min);
                  const steppedValue = Math.round(newValue / step) * step;
                  handleChange(index, steppedValue);
                };
                
                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };