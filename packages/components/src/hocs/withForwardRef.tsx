import React, { ComponentType, forwardRef } from "react";

/**
 * !HACK
 * @description This component is used to forward refs of class components.
 * This is useful for components that cannot be function components, for
 * example, if they need `componentDidCatch` which cannot be implemented in
 * hooks at the time of this comment. This is also useful to inject refs for
 * components wrapped with next/dynamic
 * @author David Lee
 * @date June 14, 2022
 */
export const withForwardRef = <T extends unknown, P extends unknown>(
	Component: ComponentType<P>
) => {
	const wrappedComponent = (props, ref) => {
		return <Component {...props} innerRef={ref} />;
	};

	wrappedComponent.displayName = `WithForwardedRef(${
		wrappedComponent.displayName || wrappedComponent.name
	})`;

	return forwardRef<T, P>(wrappedComponent);
};
