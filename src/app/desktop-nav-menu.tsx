"use client";
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useCategories } from "@/db/api";

interface IMenuItem {
  title: string;
  href: string;
  description: string;
}

const defaultMenuItems: IMenuItem[] = [
  {
    title: "General",
    href: "/settings/categories",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
];

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function DesktopNavMenu() {
  const [components, setComponents] = React.useState(defaultMenuItems);
  const { isLoading, error, data: categoryData } = useCategories();

  React.useEffect(() => {
    if (isLoading) return; // still loading

    if (error || !categoryData) {
      console.error("An error loading data.");
      return;
    }

    const menuCategories = categoryData
      .filter((c) => c.enabled)
      .map(
        (c) =>
          ({
            title: c.name,
            href: `/categories/${c.name?.replaceAll(" ", "_").toLowerCase()}`,
            description: c.description,
          } as IMenuItem)
      );

    setComponents(menuCategories);
  }, [isLoading, error, categoryData]);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[250px] md:grid-cols-1 lg:w-[300px]">
              <ListItem title="Categories" href="/settings/categories">
                Configure To-Do List Categories
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, href, children, ...props }, ref) => {
  return (
    <li>
      <Link href={href ?? "/"} legacyBehavior passHref prefetch={false}>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";
