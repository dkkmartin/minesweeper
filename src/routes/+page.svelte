<script lang="ts">
	import { triggerWhackEvent } from '$lib/utils'
	let min = $state(0)
	let max = $state(7)
	let score = $state(0)
	let intervalTime = $derived(
		score >= 10 && score < 20
			? 800
			: score >= 20 && score < 30
				? 600
				: score >= 30 && score < 40
					? 500
					: score >= 40
						? 400
						: 1000
	)
	let isGameRunning = $state()

	const gameBoard = $state(
		Array(8)
			.fill(null)
			.map(() => Array(8).fill(false))
	)

	const handleCellClick = (column: number, row: number) => {
		if (gameBoard[column][row]) {
			score++
			gameBoard[column][row] = false
		} else {
			if (score <= 0) {
				score = 0
			} else {
				score--
			}
		}
	}

	$effect(() => {
		console.log(intervalTime)

		isGameRunning = true
		let gameLoop = setInterval(() => {
			const loopChecker = triggerWhackEvent(gameBoard, min, max)
			if (loopChecker === false) {
				clearInterval(gameLoop)
				isGameRunning = false
			}
		}, intervalTime)

		return () => clearInterval(gameLoop)
	})
</script>

<main class="flex justify-center items-center h-screen flex-col gap-4">
	<h1 class="text-5xl font-bold">{score}</h1>
	<section class="grid grid-cols-8 max-w-[calc(8*6rem)]">
		{#each gameBoard as column, indexColumn}
			{#each column as row, indexRow}
				<button
					disabled={!isGameRunning}
					onclick={() => handleCellClick(indexColumn, indexRow)}
					class="border h-24 w-24"
				>
					{row ? 'Mole' : ''}
				</button>
			{/each}
		{/each}
	</section>
</main>
