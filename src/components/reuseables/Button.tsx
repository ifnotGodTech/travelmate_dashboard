"use client";
import React, { useState } from "react";
import clsx from "clsx";

// Button Component
type ButtonProps = {
  title: string;
  icon?: string;
  iconPosition?: "left" | "right";
  type?: "button" | "submit";
  id?: string;
  variant?:
    | "light-blue"
    | "blue"
    | "light-red"
    | "gray"
    | "orange"
    | "orange-deep"
    | "success"
    | "gray-white"
    | "red"
    | "outline-dark"
    | "outline";
  onClick?: () => void;
  className?: string;
  weight?: "600" | "500";
  iconAlt?: string;
  full?: boolean;
  border?: boolean;
  special?: boolean;
  size?: "16" | "14";
  responsiveHideText?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  iconPosition = "left",
  variant = "blue",
  onClick,
  className,
  weight = "500",
  iconAlt = "icon",
  full = false,
  border = false,
  special = false,
  type = "submit",
  size = "16",
  id = "",
  responsiveHideText = false,
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      id={id}
      disabled={disabled || loading}
      className={clsx(
        "cursor-pointer flex items-center justify-center gap-2 rounded-[8px] transition-all duration-200",
        {
          "px-10 py-6": size === "16",
          "px-6 py-4": size === "14",
          "bg-[#ccd8e8] text-[#023e8a]": variant === "light-blue",
          "bg-[#023e8a] text-[#fff]": variant === "blue",
          "bg-[#ffd2d2] text-[#d72638]": variant === "light-red",
          "bg-[#9B9EA4] text-[#fff]": variant === "gray",
          "bg-[#EBECED] text-[#181818]": variant === "gray-white",
          "bg-transparent text-[#67696D] border-[1px] border-[#67696D]":
            variant === "outline",
          "bg-transparent text-[#181818] border-[1px] border-[#9B9EA4]":
            variant === "outline-dark",
          "bg-[#D5EBDF] text-[#2D9C5E]": variant === "success",
          "bg-[#FFE2D2] text-[#FF6F1E]": variant === "orange",
          "bg-[#FF6F1E] text-[#fff]": variant === "orange-deep",
          "bg-[#D72638] text-[#fff]": variant === "red",
          "w-full": full,
          "border-[1px] border-[#cdced1]": border,
          "bg-[#9B9EA4] text-[#fff] cursor-not-allowed": disabled || loading,
        },
        className
      )}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {icon && iconPosition === "left" && !loading && (
        <img
          src={icon}
          alt={iconAlt}
          className={clsx({
            "w-5 h-5": size === "16",
            "w-4 h-4": size === "14",
          })}
        />
      )}
      <span
        className={clsx("font-inter leading-[100%] tracking-[0%]", {
          "text-[16px]": size === "16",
          "text-[14px]": size === "14",
          "font-medium": weight === "500",
          "font-semibold": weight === "600",
          "hidden lg:inline": responsiveHideText,
        })}
      >
        {title}
      </span>

      {icon && iconPosition === "right" && !loading && (
        <img
          src={icon}
          alt={iconAlt}
          className={clsx({
            "w-5 h-5": size === "16",
            "w-4 h-4": size === "14",
          })}
        />
      )}
    </button>
  );
};

export default Button;

// ToggleButton Component
export type ToggleButtonProps = {
  title: string;
  icon?: string;
  iconPosition?: "left" | "right";
  variant?:
    | "light-blue"
    | "blue"
    | "light-red"
    | "gray"
    | "orange"
    | "success"
    | "gray-white";
  onClick?: () => void;
  weight?: "600" | "500";
  iconAlt?: string;
  full?: boolean;
  border?: boolean;
  className?: string;
  isActive?: boolean;
  badgeCount?: number;
  size?: "16" | "14";
  responsiveHideText?: boolean; // New prop for responsive text visibility
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  title,
  icon,
  iconPosition = "left",
  variant = "blue",
  onClick,
  className,
  weight = "600",
  iconAlt = "icon",
  full = false,
  border = false,
  isActive = false,
  badgeCount,
  size = "16",
  responsiveHideText = false,
}) => {
  const [active, setActive] = useState(isActive);

  const handleClick = () => {
    setActive(!active);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "cursor-pointer flex items-center justify-center gap-2 rounded-[8px] transition-all duration-200 ",
        {
          "px-5 py-3": size === "16",
          "px-4 py-2.5": size === "14",
          "bg-[#ccd8e8] text-[#023e8a]": variant === "light-blue",
          "bg-[#023e8a] text-[#fff]": variant === "blue",
          "bg-[#ffd2d2] text-[#d72638]": variant === "light-red",
          "bg-[#9B9EA4] text-[#fff]": variant === "gray",
          "bg-[#EBECED] text-[#181818]": variant === "gray-white",
          "bg-[#D5EBDF] text-[#2D9C5E]": variant === "success",
          "bg-[#FFE2D2] text-[#FF6F1E]": variant === "orange",
          "w-full": full,
          "border-[1px] border-[#cdced1]": border,
        },
        className
      )}
    >
      <div
        className={clsx("flex items-center justify-center rounded-full", {
          "w-[20px] h-[20px] border-[2px]": size === "16",
          "bg-[#fff] border-[#67696D]": !active,
          "bg-[#fff] border-[#023e8a]": active,
        })}
      >
        {active && (
          <div
            className={clsx("rounded-full", {
              "w-[10px] h-[10px] bg-[#023E8A]": size === "16",
            })}
          ></div>
        )}
      </div>
      (
      <span
        className={clsx("font-inter leading-[100%] tracking-[0%]", {
          "text-[16px]": size === "16",
          "text-[14px]": size === "14",
          "font-medium": weight === "500",
          "font-semibold": weight === "600",
          "hidden sm:inline": responsiveHideText,
        })}
      >
        {title}
      </span>
      )
      {icon && iconPosition === "right" && (
        <img
          src={icon}
          alt={iconAlt}
          className={clsx({
            "w-5 h-5": size === "16",
            "w-4 h-4": size === "14",
          })}
        />
      )}
    </button>
  );
};

export { ToggleButton };
