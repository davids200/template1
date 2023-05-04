import { getSession } from 'next-auth/react'

export default async function authMiddleware(req, res, next) {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).end()
    return
  }

  req.user = session.user
  console.log("req.user",req.user)
  next()
}
