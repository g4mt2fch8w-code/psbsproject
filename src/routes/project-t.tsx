import { createFileRoute, redirect } from "@tanstack/react-router";

// Fix: original file had duplicate Route export which caused compile errors.
// Redirect old /project-t path to clean /projects route.
export const Route = createFileRoute("/project-t")({
  beforeLoad: () => {
    throw redirect({ to: "/projects" });
  },
  component: () => null,
});
