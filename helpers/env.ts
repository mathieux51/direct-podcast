import { EnvError } from '../helpers/errors'

type Env = {
  reCaptchaKey: string
}

const getEnv = (): Env => {
  const env = {
    reCaptchaKey: process.env.REACT_APP_RECAPTCHA_CLIENT_SIDE!
  }
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) {
      throw new EnvError(`${key} is required`)
    }
  }
  return env
}

export default getEnv()
