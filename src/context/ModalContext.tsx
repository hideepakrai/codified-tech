'use client'

import { createContext, useContext, useState } from 'react'

type ModalContextType = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}


const ModalContext = createContext<ModalContextType | undefined>(undefined)



export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    return {
      isOpen: false,
      openModal: () => {},
      closeModal: () => {},
    }
  }
  return context
}
