import { BookOpen, Users, Album } from 'lucide-react';
import { BooksManagementTab, AuthorManagementTab, CategoriesManagementTab } from '../../modules/admin';
import { ITabItem, TabsComponent } from '@book-toshokan/libs/shared-ui';

const tabItems: ITabItem[] = [
  // {
  //   key: 'books',
  //   title: 'Books',
  //   icon: BookOpen,
  //   isDisabled: true,
  //   content: <BooksManagementTab />,
  // },
  {
    key: 'category',
    title: 'Category',
    icon: Album,
    isDisabled: false,
    content: <CategoriesManagementTab />,
  },
  {
    key: 'authors',
    title: 'Authors',
    icon: Users,
    isDisabled: false,
    content: <AuthorManagementTab />,
  },
];

export const AdminHomePage = () => {
  return (
    <div className="flex bg-gray-100 dark:bg-background/80">
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:mx-20">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Book Catalogue Admin</h1>
        <TabsComponent color="secondary" items={tabItems} />
      </div>
    </div>
  );
};
