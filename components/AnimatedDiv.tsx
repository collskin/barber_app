"use client";

import { HTMLMotionProps, motion } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
    children: any;
    delay?: any;
}

export const Animation = ({ children }: any) => {
    return (
        <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.2,
                type: "ease",
            }}
        >
            {children}
        </motion.div>
    );
};

const initial = "offscreen";
const whileInView = "onscreen";

export const AnimatedDiv = ({ children, delay, ...rest }: Props) => {
    return (
        <motion.div
            {...rest}
            initial={initial}
            whileInView={whileInView}
            viewport={{
                once: true,
                amount: "some",
            }}
            variants={{
                offscreen: {
                    y: 100,
                    opacity: 0,
                },
                onscreen: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.5,
                        type: "ease-out",
                        delay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
};


export const AnimatedSection = ({ children, delay, ...rest }: Props) => {
    return (
        <motion.section
            {...rest}
            initial={initial}
            whileInView={whileInView}
            viewport={{
                once: true,
                amount: "some",
            }}
            variants={{
                offscreen: {
                    y: 100,
                    opacity: 0,
                },
                onscreen: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.5,
                        type: "ease-out",
                        delay,
                    },
                },
            }}
        >
            {children}
        </motion.section>
    );
};


export const AnimatedDivImg = ({ children, delay, ...rest }: Props) => {
    return (
        <motion.div
            {...rest}
            initial={initial}
            whileInView={whileInView}
            viewport={{
                once: true,
                amount: "some",
            }}
            variants={{
                offscreen: {
                    y: 100,
                    opacity: 0,
                    mixBlendMode: 'lighten'
                },
                onscreen: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.5,
                        type: "ease-out",
                        delay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
};
