import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/product')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/product"!</div>
}
