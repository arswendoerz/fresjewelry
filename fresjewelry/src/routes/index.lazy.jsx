import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <img src="../src/assets/image.png" alt="Homepage Image" />
    </div>
  );
}
