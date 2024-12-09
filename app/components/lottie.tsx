"use client"
import { useLottie } from "lottie-react";

type Props = {
    animationdata:any
};

const lottieAnimation = ({animationdata}: Props) => {
  const options = {
    animationData: animationdata,
    loop: true,
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export default lottieAnimation;
