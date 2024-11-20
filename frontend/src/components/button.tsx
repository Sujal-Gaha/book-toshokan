import { extendVariants, Button as NextUIButton } from "@nextui-org/react";

export const Button = extendVariants(NextUIButton, {
  variants: {
    color: {
      default:
        "text-gray-200 font-medium text-base hover:bg-gray-50 hover:text-black",
      violet: "bg-[#8b5cf6] text-[#fff]",
      blue: "bg-[#006fee] text-[#ffffff] text-base font-medium w-full",
    },
    isDisabled: {
      true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
    },
    size: {
      xs: "px-2 min-w-12 h-6 text-tiny gap-1 rounded-small",
      md: "px-4 min-w-20 h-10 text-small gap-2 rounded-small",
      xl: "px-8 min-w-28 h-14 text-large gap-4 rounded-medium",
    },
  },
  defaultVariants: {
    color: "blue",
    size: "xl",
  },
  compoundVariants: [
    {
      isDisabled: true,
      color: "blue",
      class: "bg-[#84cc16]/80 opacity-100",
    },
  ],
});
