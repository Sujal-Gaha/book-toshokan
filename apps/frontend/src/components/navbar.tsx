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
} from "@heroui/react";
import { BookOpen, UserIcon } from 'lucide-react';
import { getAppsPath } from '../utils/getAppsPath';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon } from '../icons';
import { MoonIcon } from '../icons';
import { usePathState } from '../hooks/usePathState';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { isHomePage, isFeedPage, isMyBooksPage } = usePathState();

  const onThemeChange = (isSelected: boolean) => {
    setTheme(isSelected ? 'dark' : 'light');
  };

  const { homePage, feedPage, myBooksPage } = getAppsPath();

  return (
    <NextUINavbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} className="bg-[#f3f4f6] dark:bg-background/50">
      <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
      <NavbarBrand className="cursor-pointer" onClick={() => navigate(homePage)}>
        <BookOpen className="h-6 w-6 mr-2 text-primary" />
        <p className="font-bold text-gray-900 dark:text-white">Book-Toshokan</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href={homePage}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={feedPage}>
            Feed
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={myBooksPage}>
            My Books
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Switch
            isSelected={theme === 'dark'}
            color="primary"
            size="lg"
            thumbIcon={({ isSelected, className }) =>
              isSelected ? <MoonIcon className={className} /> : <SunIcon className={className} />
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
              color="primary"
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
            <DropdownItem key="logout" color="danger" startContent={<UserIcon />}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem key="home">
          <Link color={isHomePage ? 'primary' : 'foreground'} href={homePage} size="lg">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="Feed">
          <Link color={isFeedPage ? 'primary' : 'foreground'} href={feedPage} size="lg">
            Feed
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="My Books">
          <Link color={isMyBooksPage ? 'primary' : 'foreground'} href={myBooksPage} size="lg">
            My Books
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="logout">
          <Link color="danger" href="#" size="lg">
            Log Out
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
};
