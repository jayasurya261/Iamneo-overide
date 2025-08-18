import React from "react";
 // <-- Replace with your video path

const VideoBackground = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={"https://framerusercontent.com/assets/4prPqGo6eJh3gMKeTokOQv3gFo.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional overlay content */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-7xl font-bold font-playfair ">
        Welcome to Veloria
      </div>
    </div>
  );
};

export default VideoBackground;
