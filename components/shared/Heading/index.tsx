import React, {DetailedHTMLProps, HTMLAttributes} from "react";

interface HeadingProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>{
    level?: string;
}

export const Heading = ({ children, level, ...props }: HeadingProps) => {
    const HeadingComponent = level || "h2";

    return <HeadingComponent {...props}>{children}</HeadingComponent>
}