import { createContext, ReactNode, useContext } from 'react'

type AnimationContext = {
  disableAnimations?: boolean
}

const AnimationContext = createContext<AnimationContext | null>(null)

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimation must be used within an <AnimationProvider>')
  }
  return context
}

type AnimationProviderProps = {
  children: ReactNode
} & AnimationContext
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
