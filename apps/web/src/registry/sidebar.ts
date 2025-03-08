import {
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
  Building2,
  Building,
} from "lucide-react";

export const enum GROUPS {
  CLIENT = "Client",
  ORGANIZATION = "Organization",
  AUTHENTICATION = "Authentication",
  AUTHORIZATION = "Authorization",
}

export const enum USERS {
  CLIENT = "c",
  ORGANIZATION = "o",
}

export const LINKS = {
  // C Specific
  PROFILE_C: {
    title: "Profile",
    url: "profile",
    icon: UserRound,
  },

  // O Specific
  PROFILE_O: {
    title: "Profile",
    url: "profile",
    icon: Building,
  },

  // General
  ORGANIZATION: {
    title: "Organizations",
    url: "organizations",
    icon: Building2,
  },
  SETTING: {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
  DASHBOARD: {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
  },
  KEY: {
    title: "Keys",
    url: "keys",
    icon: KeyRound,
  },
  TEAM: {
    title: "Team",
    url: "team",
    icon: UsersRound,
  },
  FORM: {
    title: "Forms",
    url: "forms",
    icon: FilePenLine,
  },
  SESSION: {
    title: "Sessions",
    url: "sessions",
    icon: IdCard,
  },
  EMAIL: {
    title: "Email",
    url: "email",
    icon: Mail,
  },
  ROLE: {
    title: "Roles",
    url: "roles",
    icon: UserRoundCog,
  },
  PERMISSION: {
    title: "Permissions",
    url: "permissions",
    icon: ShieldBan,
  },
};

export const TABS = {
  ORGANIZATION: { title: "Organizations", value: "organizations" },
  PROFILE: { title: "Profile", value: "profile" },
  SETTING: { title: "Settings", value: "settings" },
  DASHBOARD: {
    title: "Dashboard",
    value: "dashboard",
  },
  KEY: { title: "Keys", value: "keys" },
  MEMBER: { title: "Members", value: "members" },
  ROLE: { title: "Roles", value: "roles" },
  PERMISSION: { title: "Permissions", value: "permissions" },
  FORM: { title: "Forms", value: "forms" },
  USER: { title: "User", value: "user" },
  DEVICE: { title: "Device", value: "device" },
  APP: { title: "App", value: "app" },
  TEMPLATE: { title: "Template", value: "template" },
};

export const data = [
  // C - Client
  {
    users: USERS.CLIENT,
    group: GROUPS.CLIENT,
    ...LINKS.ORGANIZATION,
    tabs: {
      default: TABS.ORGANIZATION.value,
      list: [TABS.ORGANIZATION],
    },
  },
  {
    users: USERS.CLIENT,
    group: GROUPS.CLIENT,
    ...LINKS.PROFILE_C,
    tabs: {
      default: TABS.PROFILE.value,
      list: [TABS.PROFILE],
    },
  },
  {
    users: USERS.CLIENT,
    group: GROUPS.CLIENT,
    ...LINKS.SETTING,
    tabs: {
      default: TABS.SETTING.value,
      list: [TABS.SETTING],
    },
  },

  // O - Organization
  {
    users: USERS.ORGANIZATION,
    group: GROUPS.ORGANIZATION,
    ...LINKS.DASHBOARD,
    tabs: {
      default: TABS.DASHBOARD.value,
      list: [TABS.DASHBOARD],
    },
  },
  {
    users: USERS.ORGANIZATION,
    group: GROUPS.ORGANIZATION,
    ...LINKS.PROFILE_O,
    tabs: {
      default: TABS.PROFILE.value,
      list: [TABS.PROFILE],
    },
  },
  {
    users: USERS.ORGANIZATION,
    group: GROUPS.ORGANIZATION,
    ...LINKS.KEY,
    tabs: {
      default: TABS.KEY.value,
      list: [TABS.KEY],
    },
  },
  {
    users: USERS.ORGANIZATION,
    group: GROUPS.ORGANIZATION,
    ...LINKS.TEAM,
    tabs: {
      default: TABS.MEMBER.value,
      list: [TABS.MEMBER, TABS.PERMISSION],
    },
  },
  {
    users: USERS.ORGANIZATION,
    group: GROUPS.ORGANIZATION,
    ...LINKS.SETTING,
    tabs: {
      default: TABS.SETTING.value,
      list: [TABS.SETTING],
    },
  },

  // O - Authentication
  {
    users: USERS.ORGANIZATION,
    group: GROUPS.AUTHENTICATION,
    ...LINKS.FORM,
    tabs: {
      default: TABS.FORM.value,
      list: [TABS.FORM],
    },
  },
  {
    users: USERS.ORGANIZATION,
    group: GROUPS.AUTHENTICATION,
    ...LINKS.SESSION,
    tabs: {
      default: TABS.USER.value,
      list: [TABS.USER, TABS.DEVICE],
    },
  },
  {
    users: USERS.ORGANIZATION,
    group: GROUPS.AUTHENTICATION,
    ...LINKS.EMAIL,
    tabs: {
      default: TABS.APP.value,
      list: [TABS.APP, TABS.TEMPLATE],
    },
  },

  // O - Authorization
  {
    users: USERS.ORGANIZATION,
    group: GROUPS.AUTHORIZATION,
    ...LINKS.ROLE,
    tabs: {
      default: TABS.ROLE.value,
      list: [TABS.ROLE],
    },
  },
  {
    users: USERS.ORGANIZATION,
    group: GROUPS.AUTHORIZATION,
    ...LINKS.PERMISSION,
    tabs: {
      default: TABS.PERMISSION.value,
      list: [TABS.PERMISSION],
    },
  },
];

export function getSidebarLinks(userType: USERS) {
  // Use a Map to accumulate the grouped results
  const map = new Map<string, { title: string; url: string; icon: any }[]>();

  data
    .filter((item) => item.users === userType) // Filter by userType
    .forEach((item) => {
      const { group, title, url, icon } = item;

      // Check if the group already exists in the map
      if (map.has(group)) {
        // If it exists, push the new item
        map.get(group)?.push({ title, url, icon });
      } else {
        // Otherwise, initialize a new array with the item
        map.set(group, [{ title, url, icon }]);
      }
    });

  // Convert the Map back to a plain object for easier readability if needed
  return Object.fromEntries(map);
}

export function getNavbarTabs(userType: USERS, targetUrl: string) {
  // Filter data by userType and url
  const filteredData = data.filter(
    (item) => item.users === userType && item.url === targetUrl,
  );

  if (filteredData.length === 1) {
    return filteredData[0]?.tabs;
  }

  return undefined;
}
