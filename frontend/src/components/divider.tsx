interface IDivider {
  direction?: "horizontal" | "vertical";
}

export const Divider = ({ direction }: IDivider) => {
  if (direction === "vertical")
    return <div className="border-l border-gray-300 h-full"></div>;
  return <div className="border-t border-gray-300 w-full"></div>;
};
