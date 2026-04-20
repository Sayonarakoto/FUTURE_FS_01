import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'

export function useGsapReveal(scopeRef, shouldReveal, shouldReduceMotion, animations, replayKey) {
  const lastRunTokenRef = useRef('')
  const animationSignature = useMemo(() => JSON.stringify(animations), [animations])

  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope || shouldReduceMotion || !shouldReveal) {
      lastRunTokenRef.current = ''
      return undefined
    }

    const runToken = `${animationSignature}:${String(replayKey ?? 'auto')}`
    if (lastRunTokenRef.current === runToken) return undefined
    lastRunTokenRef.current = runToken

    const ctx = gsap.context(() => {
      animations.forEach((animation) => {
        const targets = scope.querySelectorAll(animation.selector)
        if (!targets.length) return

        gsap.killTweensOf(targets)

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
            overwrite: 'auto',
            clearProps: 'opacity,transform,filter',
            ...animation.to,
          }
        )
      })
    }, scope)

    return () => ctx.revert()
  }, [animationSignature, replayKey, scopeRef, shouldReduceMotion, shouldReveal])
}
