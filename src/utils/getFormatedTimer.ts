/**
 *Function for formatting seconds in the format "HH:MM:SS".
 * @param time time in seconds
 * @returns
 */
export function getFormatedTimer(time: number) {
	return new Date(time * 1000).toISOString().slice(11, 19)
}
