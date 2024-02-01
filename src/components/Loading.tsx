export const Loading = () => {
  return (
    <div className="fixed inset-0 bg-[#f8f9f9] z-40 flex items-center justify-center">
      <div className="w-52 h-52 border-8 border-primary border-dotted rounded-full animate-spin"></div>
    </div>
  );
};
