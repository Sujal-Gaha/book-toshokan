import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Switch,
} from '@nextui-org/react';
import { BookOpen, UserIcon } from 'lucide-react';
import { getAppsPath } from '../utils/getAppsPath';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon } from './icons';
import { MoonIcon } from './icons';

export const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const onThemeChange = (isSelected: boolean) => {
    setTheme(isSelected ? 'dark' : 'light');
  };

  const { adminHomePage } = getAppsPath();

  return (
    <NextUINavbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      className="bg-[#f3f4f6] dark:bg-background/50"
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="sm:hidden"
      />
      <NavbarBrand
        className="cursor-pointer"
        onClick={() => navigate(adminHomePage)}
      >
        <BookOpen className="h-6 w-6 mr-2 text-secondary" />
        <p className="font-bold text-gray-900 dark:text-white">Book-Toshokan</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Switch
            isSelected={theme === 'dark'}
            color="secondary"
            size="lg"
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <MoonIcon className={className} />
              ) : (
                <SunIcon className={className} />
              )
            }
            onValueChange={onThemeChange}
          />
        </NavbarItem>
        <Dropdown type="menu" placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="/placeholder.svg?height=32&width=32"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              startContent={<UserIcon />}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      {/* <NavbarMenu>
        <NavbarMenuItem key="home">
          <Link
            color={isHomePage ? 'primary' : 'foreground'}
            href={homePage}
            size="lg"
          >
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="Feed">
          <Link
            color={isFeedPage ? 'primary' : 'foreground'}
            href={feedPage}
            size="lg"
          >
            Feed
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="My Books">
          <Link
            color={isMyBooksPage ? 'primary' : 'foreground'}
            href={myBooksPage}
            size="lg"
          >
            My Books
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="logout">
          <Link color="danger" href="#" size="lg">
            Log Out
          </Link>
        </NavbarMenuItem>
      </NavbarMenu> */}
    </NextUINavbar>
  );
};
