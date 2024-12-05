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
} from '@nextui-org/react';
import { BookOpen, MoonIcon, SunIcon, UserIcon } from 'lucide-react';
import { getAppsPath } from '../utils/getAppsPath';
import { useThemeStore } from '../store/useThemeStore';

export const Navbar = () => {
  const { registerPage } = getAppsPath();
  const { mode, toggleMode } = useThemeStore();

  return (
    <NextUINavbar className="bg-background border-b dark:border-none">
      <NavbarBrand>
        <BookOpen className="h-6 w-6 mr-2 text-primary" />
        <p className="font-bold text-gray-900 dark:text-white">Book-Toshokan</p>
      </NavbarBrand>
      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Pricing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
      </NavbarContent> */}
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
    </NextUINavbar>
  );
};
