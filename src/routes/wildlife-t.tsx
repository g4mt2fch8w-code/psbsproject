import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/wildlife-t")({
  beforeLoad: () => {
    throw redirect({ to: "/wildlife" });
  },
  component: () => null,
});
