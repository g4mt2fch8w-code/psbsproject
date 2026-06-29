import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/news-t")({
  beforeLoad: () => {
    throw redirect({ to: "/news" });
  },
  component: () => null,
});
