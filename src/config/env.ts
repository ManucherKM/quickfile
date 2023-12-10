// Utils
import { from } from 'env-var'

/**
 * An object to receive environment variables.
 *
 * @example
 * 	const API_URL = env.get('API_URL').required().asString()
 */
export const env = from({
	API_URL: process.env.NEXT_PUBLIC_API_URL,
	CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
})
