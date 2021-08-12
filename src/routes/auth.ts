import { validate } from "class-validator";
import { Request, Response, Router } from "express";
import { User } from "../entities/User";


const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body

  try {
    // TODO Validate data
    let errors: any = {}

    const existingEmail = await User.findOne({ email })
    const existingUsername = await User.findOne({ username })

    if (existingEmail) errors.email = 'Email is already taken'
    if (existingUsername) errors.username = 'Username is already taken'

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors)
    }
    // TODO Create the user
    const user = new User({ email, username, password })
    errors = await validate(user)
    if (errors.length > 0) return res.status(400).json({ errors })
    await user.save()

    return res.status(201).json(user)

    // TODO Return the user
  } catch (err) {
    return res.status(500).json(err)
  }
}

const login = async (req: Request, res: Response) => {
  const { username, passwors } = req.body
}

const router = Router()
router.post('/register', register)
router.post('/login', login)

export default router;