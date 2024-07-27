"use client";

const ProtectedPage = () => {
  return (
    <div className="w-full">
      <h1>Protected Content</h1>
      <p>This content is only visible to authenticated users.</p>
    </div>
  );
};

export default ProtectedPage;
