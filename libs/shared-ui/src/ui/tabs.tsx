import { ReactNode } from 'react';
import { Tabs, Tab, TabsProps } from "@heroui/react";
import { type LucideIcon } from 'lucide-react';

export interface ITabItem {
  key: string;
  title: string;
  icon: LucideIcon;
  content: ReactNode;
  isDisabled: boolean;
}

interface TabsComponentProps extends TabsProps {
  items: ITabItem[];
}

export const TabsComponent = ({ items, ...props }: TabsComponentProps) => {
  return (
    <Tabs aria-label="Dynamic Tabs" {...props}>
      {items.map((item) => (
        <Tab
          key={item.key}
          title={
            <div className="flex items-center space-x-2">
              <item.icon className="w-4 h-4" />
              <span>{item.title}</span>
            </div>
          }
          isDisabled={item.isDisabled}
        >
          {item.content}
        </Tab>
      ))}
    </Tabs>
  );
};
