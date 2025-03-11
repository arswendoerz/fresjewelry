import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/shoppingCart/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/shoppingCart/"!</div>
}
