import {
  Gauge,
  MessagesSquare,
  Wrench,
  Users,
  Folder,
  BookOpen,
  BarChart3,    
  } from "lucide-react";

export type SiteConfig = typeof siteConfig;
export type Navigation = {
  icon: any;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "Quang Minh Nguyen",
  description: "Created by Quang Minh Nguyen",
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
    href: "/committee"
  },
  {
    icon: Folder,
    name: "Levies",
    href: "/levies",
  },
  {
    icon: BookOpen,
    name: "Documents",
    href: "/documents",
  },
  {
    icon: BarChart3,
    name: "Feedback",
    href: "/feedback",
  },
];
