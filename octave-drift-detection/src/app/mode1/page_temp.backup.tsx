'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Mode1Page() {
  const router = useRouter()
  const [businessUnit, setBusinessUnit] = useState<string>('')
  const [useCase, setUseCase] = useState<string>('')
  const [shortCode, setShortCode] = useState<string>('-')

  useEffect(() => {
    // Initialize from localStorage
    const savedBusinessUnit = localStorage.getItem('businessUnit')
    const savedUseCase = localStorage.getItem('useCase')
    
    if (savedBusinessUnit) {
      setBusinessUnit(savedBusinessUnit)
      if (savedUseCase) {
        setUseCase(savedUseCase)
        setShortCode(`${savedBusinessUnit.substring(0,2)}-${
