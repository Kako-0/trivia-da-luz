<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<title>Trivia da Luz</title>
	<meta
		name="description"
		content="Um trívia espiríta feito especialmente para o grupo Juventude da luz do c.e. Mensageiros da Luz" />
</svelte:head>

{@render children()}
