import { Checkbox as NextUICheckbox, extendVariants } from "@nextui-org/react";

export const Checkbox = extendVariants(NextUICheckbox, {
  variants: {
    variant: {
      default: {},
      switch: {
        base: [
          "inline-flex flex-row-reverse w-full max-w-md bg-content1 m-0",
          "hover:bg-content2 items-center justify-between",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ],
        label: "w-full",
        icon: [
          "text-primary-foreground",
          "after:bg-current after:rounded-full",
          "after:content-[''] after:block",
          "after:w-[12px] after:h-[12px] after:mt-[1px] after:ml-[1px]",
          "group-data-[selected=true]:after:ml-[13px]",
          "group-data-[selected=true]:bg-primary",
        ],
        wrapper: [
          "h-5 w-8",
          "rounded-full outline-none",
          "bg-default-200 group-data-[selected=true]:bg-primary",
        ],
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
