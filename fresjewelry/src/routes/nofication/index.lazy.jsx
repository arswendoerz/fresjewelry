import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/nofication/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/nofication/"!</div>
}
