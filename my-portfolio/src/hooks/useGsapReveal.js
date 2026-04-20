import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export function useGsapReveal(scopeRef, shouldReveal, shouldReduceMotion, animations, replayKey) {
  const lastReplayKeyRef = useRef(null)
  const previousRevealRef = useRef(false)
  const fallbackReplayRef = useRef(0)

  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope || shouldReduceMotion) {
      previousRevealRef.current = false
      return undefined
    }

    if (!shouldReveal) {
      previousRevealRef.current = false
      return undefined
    }

    const nextReplayKey =
      replayKey ?? (previousRevealRef.current ? fallbackReplayRef.current : fallbackReplayRef.current + 1)

    if (!previousRevealRef.current && replayKey == null) {
      fallbackReplayRef.current += 1
    }

    previousRevealRef.current = true

    if (lastReplayKeyRef.current === nextReplayKey) return undefined
    lastReplayKeyRef.current = nextReplayKey

    const ctx = gsap.context(() => {
      animations.forEach((animation) => {
        const targets = scope.querySelectorAll(animation.selector)
        if (!targets.length) return

        gsap.fromTo(
          targets,
          {
            opacity: 0,
            y: 28,
            scale: 0.97,
            filter: 'blur(16px)',
            ...animation.from,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: animation.duration ?? 1,
            delay: animation.delay ?? 0,
            ease: animation.ease ?? 'power3.out',
            stagger: animation.stagger ?? 0.12,
            clearProps: 'opacity,transform,filter',
            ...animation.to,
          }
        )
      })
    }, scope)

    return () => ctx.revert()
  }, [animations, replayKey, scopeRef, shouldReduceMotion, shouldReveal])
}
