import React, {ComponentType, Suspense} from "react";
import Preloader from "../components/common/Preloader";
export function withSuspense <WrappedComponentProps> (WrappedComponent: ComponentType<WrappedComponentProps>) {
    return (props: WrappedComponentProps) => {
       return (<Suspense fallback={<Preloader/>}>
            <WrappedComponent {...props}/>
        </Suspense>)
    }
}