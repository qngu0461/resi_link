import {
  Gauge,
  MessagesSquare,
  Wrench,
  Users,
  Folder,
  BarChart3,
  LucideIcon,
  DollarSignIcon,
  Building,
  UserCheck,
} from "lucide-react";

export type SiteConfig = typeof siteConfig;


export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};


export const siteConfig = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "My App",
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "",
};

export const navigations: Navigation[] = [
  {
    icon: Gauge,
    name: "Dashboard",
    href: "/",
  },
 
  {
    icon: DollarSignIcon,
    name: "Levies",
    href: "/levies",
  },
  {
    icon: Folder,
    name: "Documents",
    href: "/documents",
  },
  {
    icon: Building,
    name: "Building Info",
    href: "/buildinginfo",
  },
  {
    icon: UserCheck,
    name: "Strata Roll",
    href: "/strataroll",
  },
  {
    icon: MessagesSquare,
    name: "Chat",
    href: "/chat",
  },
  {
    icon: BarChart3,
    name: "Feedback",
    href: "/feedback",
  },
  {
    icon: Wrench,
    name: "Requests",
    href: "/requests",
  },
  {
    icon: Users,
    name: "Committee",
    href: "/committee",
  },
];
