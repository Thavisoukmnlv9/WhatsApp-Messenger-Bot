
import {
  Briefcase,
  Home,
  Settings,
} from "lucide-react";

export interface NavLink {
  title: string;
  subject?: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface IResources extends NavLink {
  sub?: NavLink[];
}

export const resources: IResources[] = [
  {
    title: "bot",
    subject: "bot",
    href: "/bot",
    icon: <Home size={18} />,
  },
  {
    title: "bot1",
    subject: "bot1",
    href: "/bot",
    icon: <Home size={18} />,
  },
  {
    title: "ຕັ້ງຄ່າ",
    href: "setting",
    subject: "/setting",
    icon: <Settings size={18} />,
    sub: [
      {
        title: "User",
        subject: "user",
        href: "/user",
        icon: <Briefcase size={18} />,
      },
    ],
  },
];

