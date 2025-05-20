import { HoverEffect } from "@/components/admin/CardHover";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <h1 className="text-4xl font-bold text-center my-8 text-zinc-100">Component Library</h1>
      <HoverEffect items={components} />
    </div>
  );
}

export const components = [
  {
    title: "Login Form",
    description:
      "A modern authentication form with dark mode support, form validation, and API integration.",
    link: "/auth/login",
  },
  {
    title: "Sign Up Form",
    description:
      "User registration form with password validation, error handling, and responsive design.",
    link: "/auth/signup",
  },
  {
    title: "Search Box",
    description:
      "Real-time search component with debouncing, PostgreSQL integration, and dynamic results.",
    link: "/search",
  },
  {
    title: "Dashboard",
    description:
      "Admin dashboard with statistics, charts, and responsive layout.",
    link: "/dashboard",
  },
  {
    title: "User Profile",
    description:
      "Profile page with editable fields, avatar upload, and settings management.",
    link: "/profile",
  },
  {
    title: "Settings Panel",
    description:
      "User preferences and application settings with theme switching and notifications.",
    link: "/settings",
  },
];