import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/aboutUs/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/aboutUs/"!</div>
}
