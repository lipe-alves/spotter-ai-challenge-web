import React, { ReactNode } from "react";

type ComponentList = [component: (props: any) => JSX.Element, props?: any][];

interface ComposerProps {
    components: ComponentList;
    children?: ReactNode;
}

const Composer = (props: ComposerProps) => (
    <>
        {props.components.reduceRight(
            (otherComponents, [Component, props]) => (
                <Component {...props}>{otherComponents}</Component>
            ),
            props.children
        )}
    </>
);

export { Composer };
export type { ComposerProps, ComponentList };
export default Composer;
