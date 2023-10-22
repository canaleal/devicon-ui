
interface NotFoundProps {
  errorMessage?: string;
}

const NotFound = ({ errorMessage = "404 Not Found!" }: NotFoundProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-smoke dark:bg-zinc-800 dark:text-white  px-32 py-8 ">
      <div className="flex flex-col justify-center bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md">
        <h1 className="font-bold text-2xl text-red-500">Error</h1>
        <p className="mt-4">{errorMessage}</p>
      </div>
    </div>
  );
};

export default NotFound;
