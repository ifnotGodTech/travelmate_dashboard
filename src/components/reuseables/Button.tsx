import React from "react";
import clsx from "clsx";

type ButtonProps = {
  title: string;
  icon?: string; // Image URL (SVG, PNG, JPG)
  iconPosition?: "left" | "right";
  variant?: "light-blue" | "blue" | "light-red" | "gray" | "orange" | "success";
  onClick?: () => void;
  className?: string;
  weight?: "600" | "500"; // Font weight support
  iconAlt?: string;
  full?: boolean; // Boolean for full width
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
  full = false, // Default is false
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center gap-4 px-[40px] py-[20px] rounded-[8px] transition-all duration-200",
        {
          "bg-[#ccd8e8] text-[#023e8a]": variant === "light-blue",
          "bg-[#023e8a] text-[#fff]": variant === "blue",
          "bg-[#ffd2d2] text-[#d72638]": variant === "light-red",
          "bg-[#9B9EA4] text-[#fff]": variant === "gray",
          "bg-[#D5EBDF] text-[#2D9C5E]": variant === "success",
          "bg-[#FFE2D2] text-[#FF6F1E]": variant === "orange",
          "w-full": full, // Apply full width if true
        },
        className
      )}
    >
      {icon && iconPosition === "left" && (
        <img src={icon} alt={iconAlt} className="w-5 h-5" />
      )}
      <span
        className={clsx(
          "font-inter text-[20px] leading-[100%] tracking-[0%] uppercase",
          {
            "font-medium": weight === "500",
            "font-semibold": weight === "600",
          }
        )}
      >
        {title}
      </span>
      {icon && iconPosition === "right" && (
        <img src={icon} alt={iconAlt} className="w-5 h-5" />
      )}
    </button>
  );
};

export default Button;
