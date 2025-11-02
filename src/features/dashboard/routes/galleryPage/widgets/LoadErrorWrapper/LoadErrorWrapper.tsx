import React from 'react'

interface LoadErrorWrapperProps {
  isLoading: boolean
  error: unknown
  children: React.ReactNode
}

export const LoadErrorWrapper: React.FC<LoadErrorWrapperProps> = ({ isLoading, error, children }) => {
  if (isLoading) {
    return <div className='flex justify-center items-center h-[20rem] text-lg'>Loading icons...</div>
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-[20rem] text-red-500 text-lg'>
        Failed to load icons. Please try again later.
      </div>
    )
  }

  return <>{children}</>
}
