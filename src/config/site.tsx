import {
  Gauge,
  MessagesSquare,
  Wrench,
  Users,
  Folder,
  BookOpen,
  BarChart3,
  LucideIcon,
  DollarSignIcon,
} from "lucide-react";

export type SiteConfig = typeof siteConfig;


export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};


export const siteConfig = {
  title: "Dang Kim Thi",
  description: "Created by DangKimThi",
};

export const navigations: Navigation[] = [
  {
    icon: Gauge,
    name: "Dashboard",
    href: "/",
  },
  {
    icon: MessagesSquare,
    name: "Chat",
    href: "/chat",
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
    icon: BarChart3,
    name: "Feedback",
    href: "/feedback",
  },
];