import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode;
  children: React.ReactNode;
}

interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  href?: string;
  current?: boolean;
  children: React.ReactNode;
}

const Breadcrumbs = ({
  separator = <ChevronRight className="h-4 w-4 mx-1" />,
  className,
  children,
  ...props
}: BreadcrumbsProps) => {
  return (
    <nav aria-label="パンくずリスト" {...props}>
      <ol
        className={cn(
          "flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400",
          className
        )}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;

          return (
            <>
              {index > 0 && <li className="mx-1">{separator}</li>}
              {child}
            </>
          );
        })}
      </ol>
    </nav>
  );
};

const BreadcrumbItem = ({
  href,
  current = false,
  className,
  children,
  ...props
}: BreadcrumbItemProps) => {
  return (
    <li
      className={cn("", className)}
      {...props}
      aria-current={current ? "page" : undefined}
    >
      {href ? (
        <Link
          href={href}
          className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          {children}
        </Link>
      ) : (
        <span className="font-medium text-gray-900 dark:text-gray-100">{children}</span>
      )}
    </li>
  );
};

export { Breadcrumbs, BreadcrumbItem };
