import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { publicRoutes , authRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT} from "@/routes";
import { NextRequest } from "next/server";

const {auth} = NextAuth(authConfig)



export default auth((req):any=> {
  const {nextUrl} = req;
  const isLoggedin = !!req.auth;

 const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
 const isPublicRoute = publicRoutes.includes(nextUrl.pathname) 
 const isAuthRoute = authRoutes.includes(nextUrl.pathname)

 if(isApiAuthRoute){
  return null
 }

 if(isAuthRoute){
  if(isLoggedin){
    return Response.redirect( new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
  }
  return null
 }

 if(!isLoggedin && !isPublicRoute){
  return Response.redirect( new URL('/login',nextUrl))
 }
 return null
})

export const config = {
    matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };