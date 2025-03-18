import db from "@repo/db/client"
import { Account, Profile, User } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOption = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({token, account, profile}: {token: any; account: Account; profile: Profile}) {
            try {
                if(!account?.provider && profile) {
                    const user = await db.user.findFirst({
                        where: {
                            OR: [
                                {
                                    provider_id: profile.sub
                                },
                                {
                                    email: profile.email
                                }
                            ]
                        },
                        select: {
                            id: true,
                            provider_id: true,
                            email: true
                        }
                    })

                    if(user) {
                        return {
                            ...token,
                            dbUserId: user.id.toString(),
                            providerId: user.provider_id
                        }
                    }
                }

                return token
            } catch (error) {
                console.error("JWT callback error: ", error)
            }
        },

        async session ({ session, token}: {session: any; token: any}) {
            try {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        id: token.dbUserId,
                    }
                }
            } catch (error) {
                console.error("Session callback error: ", error)
            }
        },

        async signIn({account, profile}: {
            user?: User | null, account: Account | null, profile?: Profile | null
        }) {
            try {
                if(!account || !profile) return false;

                const githubProfile = profile as { id?: number; email?: string; name: string};

                if(!githubProfile.id) return false;

                const existinguser = await db.user.findUnique({
                    where: {
                        email: githubProfile.email
                    }
                })

                if(!existinguser) {
                    await db.user.create({
                        data: {
                            email: githubProfile.email as string,
                            provider_id: githubProfile.id.toString(),
                            name: githubProfile.name
                        }
                    })
                }

                return true
            } catch (error) {
                console.error("Authentication error: ", error)
                return false
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET || 'ns4yyeTQHzH5lB7wlBdoKP7wnqdxyuoz'
}