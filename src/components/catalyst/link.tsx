/*
TODO: Update this component to use your client-side framework's link
component. We've provided examples of how to do this for Next.js,
Remix, and Inertia.js in the Catalyst documentation:

https://catalyst.tailwindui.com/docs#client-side-router-integration
*/

import React from "react";
import { DataInteractive as HeadlessDataInteractive } from "@headlessui/react";
import NextLink from "next/link";

export const Link = React.forwardRef(function Link(
    props: { href: string } & React.ComponentPropsWithoutRef<"a">,
    ref: React.ForwardedRef<HTMLAnchorElement>
) {
    return (
        <HeadlessDataInteractive>
            <NextLink {...props} ref={ref} />
        </HeadlessDataInteractive>
    );
});
