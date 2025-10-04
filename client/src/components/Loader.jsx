import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loader = () => {
  return (
    <div className="h-screen">
      <div className="max-w-3xl mx-auto mt-10">
        {/* Heading skeleton */}
        <Skeleton height={40} width={`70%`} style={{ margin: "0 auto 20px" }} />

        {/* Image skeleton */}
        <Skeleton height={300} borderRadius={12} />

        {/* Content lines */}
        <div className="mt-6 space-y-3">
          <Skeleton count={3} height={14} />
          <Skeleton width={`90%`} height={14} />
          <Skeleton width={`80%`} height={14} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
