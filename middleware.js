import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/events(.*)",
    "/meetings(.*)",
    "/availability(.*)",
]);

// export default clerkMiddleware((auth, req) => {
//     console.log("Middleware executed for:", req.nextUrl.pathname);
//     if (!auth().userId && isProtectedRoute(req)) {
//         return auth().redirectToSignIn();
//     }
// });

// Use Clerk middleware
export default clerkMiddleware(async (auth, req) => {
    console.log("Middleware executed for:", req.nextUrl.pathname);

    // Protect the route and redirect to sign-in if unauthorized
    if (isProtectedRoute(req)) {
        await auth.protect(); // Automatically handles redirection to sign-in
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};