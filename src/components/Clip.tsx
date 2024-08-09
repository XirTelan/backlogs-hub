import React, { useEffect, useRef, VideoHTMLAttributes } from "react";

const Clip = ({ controls = false, videoSrc, ...props }: ClipProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.load();
  }, [videoSrc]);

  return (
    <video ref={videoRef} controls={controls} {...props}>
      {videoSrc.webm && <source src={videoSrc.webm} type="video/webm" />}
      {videoSrc.mp4 && <source src={videoSrc.mp4} type="video/mp4" />}
    </video>
  );
};

export default Clip;

type ClipProps = {
  videoSrc: {
    webm: string;
    mp4: string;
  };
  controls?: boolean;
} & React.DetailedHTMLProps<
  VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;
