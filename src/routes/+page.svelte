<script lang="ts">
	import Quiz from "./Quiz.svelte";
	import quiz from "$lib/quiz.json";

	// Example JSON data
	const perguntas = quiz;
</script>

<main class="p-16 max-w-6xl mx-auto w-dvw h-dvh">
	<Quiz {perguntas} />
</main>

<style>
	main {
		font-family: "Instrument Sans", sans-serif;
		color: #1e3063;
	}
</style>
