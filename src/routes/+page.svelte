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
					: score >= 40 && score < 60
						? 400
						: score >= 60
							? 300
							: 1000
	)
	let isGameRunning = $state(false)

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

	const startGame = () => {
		isGameRunning = true
	}

	$effect(() => {
		let gameLoop: any
		if (isGameRunning) {
			gameLoop = setInterval(() => {
				const loopChecker = triggerWhackEvent(gameBoard, min, max)
				if (loopChecker === false) {
					clearInterval(gameLoop)
					isGameRunning = false
				}
			}, intervalTime)
		}

		return () => clearInterval(gameLoop)
	})
</script>

<main class="flex justify-center items-center h-screen flex-col gap-4">
	{#if isGameRunning}
		<h1 class="text-5xl font-bold">{score}</h1>
	{:else}
		<button onclick={() => startGame()}>Start Game</button>
	{/if}
	<section class="grid grid-cols-8">
		{#each gameBoard as column, indexColumn}
			{#each column as row, indexRow}
				<button
					disabled={!isGameRunning}
					onclick={() => handleCellClick(indexColumn, indexRow)}
					class="w-24 h-24 grid-item border"
				>
					{row ? '&#9865;' : ''}
				</button>
			{/each}
		{/each}
	</section>
</main>
