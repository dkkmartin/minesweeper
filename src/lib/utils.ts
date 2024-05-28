export const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Delays execution for a given number of milliseconds.
 * @param ms Number of milliseconds to delay.
 */
export const sleep = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Triggers a "whack" event on a specified 2D array by setting a randomly selected cell to true.
 * If all cells are already true, it logs a message and returns false.
 * If the selected cell is already true, it recursively selects another cell.
 *
 * @param array The 2D array of boolean values representing the game board.
 * @param min The minimum index value for both rows and columns (inclusive).
 * @param max The maximum index value for both rows and columns (inclusive).
 * @returns {boolean} Returns true if a cell was set to true, false if all cells were already true.
 */
export const triggerWhackEvent = (array: boolean[][], min: number, max: number): boolean => {
	const hasFalse = array.some((row) => row.some((cell) => !cell)) // Check if any cell is false
	const columnPos = randomNumber(min, max) // Random column index
	const rowPos = randomNumber(min, max) // Random row index

	if (!hasFalse) {
		console.log('All cells are true')
		return false
	}

	if (!array[columnPos][rowPos]) {
		array[columnPos][rowPos] = true
		return true
	} else {
		return triggerWhackEvent(array, min, max)
	}
}
