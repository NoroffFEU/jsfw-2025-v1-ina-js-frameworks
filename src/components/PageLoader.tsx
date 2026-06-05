function PageLoader() {
  return (
    <div className="grow min-h-dvh flex flex-col items-center justify-center bg-blue-50 text-blue-700">
      <span className="loader"></span>
      <p className="mt-4 font-bold">Loading product...</p>
    </div>
  );
}

export default PageLoader;
