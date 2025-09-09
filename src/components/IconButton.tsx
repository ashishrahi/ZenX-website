export const IconButton = ({ children }: { children: React.ReactNode }) => (
  <button
    type="button"
    className="p-0 m-0 w-auto h-auto min-w-0 min-h-0 flex items-center justify-center bg-transparent rounded-full hover:bg-gray-100"
  >
    {children}
  </button>
);
