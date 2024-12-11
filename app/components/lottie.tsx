"use client"
import { useLottie } from "lottie-react";

type Props = {
    animationdata: unknown;
};

function LottieAnimation({animationdata}: Props) {
  const options = {
    animationData: animationdata,
    loop: true,
  };

  const { View } = useLottie(options);

  return <>{View}</>;
}

export default LottieAnimation;