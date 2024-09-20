"use client";
import { cn } from "@/lib/utils";
import React, { MouseEventHandler } from "react";

interface Props {
  type?: "submit" | "button";
  title: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?: string;
  largerButton?: boolean;
  isLoading?: boolean;
  title2?: string;
}

const CustomButton: React.FC<Props> = ({
  title,
  onClick,
  largerButton,
  disabled = false,
  type = "button",
  color = "bg-primary",
  isLoading = false,
  title2,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        title2
          ? "flex justify-between py-2 bg-stone-950 rounded-lg text-white px-2 w-full items-center h-full"
          : "flex justify-center py-2 bg-stone-950 rounded-lg text-white px-2 w-full items-center h-full",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        color,
        isLoading && "!bg-gray-400 cursor-not-allowed",
        largerButton ? "py-5" : ""
      )}
    >
      <div
        className={cn(
          title2
            ? "flex justify-between w-full"
            : "flex justify-center items-center gap-2"
        )}
      >
        <span>{title}</span>
        {title2 && <span>{title2}</span>}
      </div>
    </button>
  );
};

export default CustomButton;
