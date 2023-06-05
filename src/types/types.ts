import type { ComputedRef, InjectionKey, Ref } from 'vue'

// Person type used throughout the application
export type Person = {
  id: number
  name: string
  email: string
  phone: string
  title: string
}

export const PersonKey: InjectionKey<{
  personsList: ComputedRef<Ref<Person[]>>
  remove: (id: number) => void
  create: (p: Person) => void
  update: (p: Person) => void
}> = Symbol('PersonContext')
