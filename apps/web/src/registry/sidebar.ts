import {
  AudioWaveform,
  ChevronRight,
  Command,
  GalleryVerticalEnd,
  Search,
  LayoutDashboard,
  KeyRound,
  UserRound,
  UsersRound,
  Settings,
  FilePenLine,
  IdCard,
  Mail,
  UserRoundCog,
  ShieldBan,
} from "lucide-react";

// This is sample data.
export const user = {
  name: "sagar",
  email: "m@example.com",
  avatar: "/shadcn.jpg",
};

export const organizations = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];

export const sidebar = {
  Organization: [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: LayoutDashboard,
      isActive: false,
      items: [],
    },
    {
      title: "Profile",
      url: "profile",
      icon: UserRound,
      isActive: false,
      items: [],
    },
    {
      title: "Keys",
      url: "keys",
      icon: KeyRound,
      isActive: false,
      items: [],
    },
    {
      title: "Team",
      url: "team",
      icon: UsersRound,
      isActive: false,
      items: [],
    },
    {
      title: "Settings",
      url: "settings",
      icon: Settings,
      isActive: false,
      items: [],
    },
  ],
  Authentication: [
    {
      title: "Forms",
      url: "forms",
      icon: FilePenLine,
      isActive: false,
      items: [],
    },
    {
      title: "Sessions",
      url: "sessions",
      icon: IdCard,
      isActive: false,
      items: [],
    },
    {
      title: "Email",
      url: "email",
      icon: Mail,
      isActive: false,
      items: [],
    },
  ],
  Authorization: [
    {
      title: "Roles",
      url: "roles",
      icon: UserRoundCog,
      isActive: false,
      items: [],
    },
    {
      title: "Permissions",
      url: "permissions",
      icon: ShieldBan,
      isActive: false,
      items: [],
    },
  ],
};
