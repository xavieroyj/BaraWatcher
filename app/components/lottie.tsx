"use client"
import { useLottie } from "lottie-react";
import { useEffect, useState } from "react";

type Props = {
    animationdata: any
};

const LottieAnimation = ({ animationdata }: Props) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const options = {
        animationData: animationdata,
        loop: true,
    };

    const { View } = useLottie(options);

    if (!isMounted) {
        return null;
    }

    return <>{View}</>;
};

export default LottieAnimation;
