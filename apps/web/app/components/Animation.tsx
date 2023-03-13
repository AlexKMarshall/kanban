import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

type AnimationContextType = {
  disableAnimations?: boolean
}

const AnimationContext = createContext<AnimationContextType | null>(null)

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimation must be used within an <AnimationProvider>')
  }
  return context
}

type AnimationProviderProps = {
  children: ReactNode
} & AnimationContextType
export function AnimationProvider({
  disableAnimations,
  children,
}: AnimationProviderProps) {
  return (
    <AnimationContext.Provider value={{ disableAnimations }}>
      {children}
    </AnimationContext.Provider>
  )
}
