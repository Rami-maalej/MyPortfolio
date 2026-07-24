'use client'

import dynamic from 'next/dynamic'

// All of these are client-only and used at the root layout level.
// `ssr: false` requires a 'use client' boundary in Next 16, so we
// wrap them here. They load asynchronously after first paint.

const Cursor = dynamic(
  () => import('@/components/ui/cursor').then((m) => m.default),
  { ssr: false }
)
const SmoothScroll = dynamic(
  () => import('@/components/layout/smooth-scroll').then((m) => m.default),
  { ssr: false }
)
const IntroSequence = dynamic(
  () => import('@/components/layout/intro-sequence').then((m) => m.default),
  { ssr: false }
)
const SectionWarp = dynamic(
  () => import('@/components/threed/section-warp').then((m) => m.default),
  { ssr: false }
)

export function ClientOverlays({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IntroSequence />
      <Cursor />
      <SectionWarp />
      <SmoothScroll>{children}</SmoothScroll>
    </>
  )
}
