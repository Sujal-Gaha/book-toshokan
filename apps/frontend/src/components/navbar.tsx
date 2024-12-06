import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import { BookOpen, MoonIcon, SunIcon, UserIcon } from 'lucide-react';
import { getAppsPath } from '../utils/getAppsPath';
import { useThemeStore } from '../store/useThemeStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeStore();

  const { homePage, feedPage, registerPage } = getAppsPath();

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
        onClick={() => navigate(homePage)}
      >
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
          <Link color="foreground" href="#">
            My Books
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="primary" as={Link} href={registerPage} variant="flat">
            Sign Up
          </Button>
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
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            className={mode}
          >
            {mode === 'dark' ? (
              <DropdownItem
                key="light"
                onClick={toggleMode}
                className={mode}
                startContent={<SunIcon />}
              >
                Switch to light
              </DropdownItem>
            ) : (
              <DropdownItem
                key="dark"
                onClick={toggleMode}
                className={mode}
                startContent={<MoonIcon />}
              >
                Switch to dark
              </DropdownItem>
            )}
            <DropdownItem
              key="logout"
              color="danger"
              className={mode}
              startContent={<UserIcon />}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem key="home">
          <Link color="primary" href={homePage} size="lg">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="Feed">
          <Link color="primary" href={feedPage} size="lg">
            Feed
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="My Books">
          <Link color="primary" href="#" size="lg">
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
