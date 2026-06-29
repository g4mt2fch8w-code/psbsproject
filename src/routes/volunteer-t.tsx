import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/volunteer-t")({
  beforeLoad: () => {
    throw redirect({ to: "/volunteer" });
  },
  component: () => null,
});
