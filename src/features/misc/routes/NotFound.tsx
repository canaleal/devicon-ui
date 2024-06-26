interface NotFoundProps {
  errorMessage?: string
}

const NotFound = ({ errorMessage = '404 Not Found!' }: NotFoundProps) => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center  px-32 py-8 '>
      <p className='text-2xl'>{errorMessage}</p>
      <p>Use the footer to go back the Dashboard.</p>
    </div>
  )
}

export default NotFound
