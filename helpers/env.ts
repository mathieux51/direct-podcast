import { EnvError } from '../helpers/errors'

type Env = {}

const getEnv = (): Env => {
  const env = {}
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) {
      throw new EnvError(`${key} is required`)
    }
  }
  return env
}

export default getEnv()
