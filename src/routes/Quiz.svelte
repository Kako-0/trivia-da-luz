<script lang="ts">
	import { fade, fly } from "svelte/transition";

	type Pergunta = {
		tema: string;
		pergunta: string;
		alternativas: string[];
		resposta: number;
	};

	type Props = {
		perguntas: Pergunta[];
	};

	let { perguntas = [] }: Props = $props();

	let index = $state(0);
	let stage = $state<"pergunta" | "resposta">("pergunta");

	let delay = $derived(index == 0 ? 0.25 : 0.55);

	function shuffle(array: Pergunta[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	// const perguntas = ["p1", "p2", "p3", "p4"];
	const embaralhadas = $state(shuffle([...perguntas]));
	const current = $derived(embaralhadas[index]);

	function proxima() {
		if (stage === "pergunta") {
			stage = "resposta";
			return;
		}
		if (stage === "resposta") {
			stage = "pergunta";
			if (index < embaralhadas.length - 1) index = index + 1;
		}
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === "Enter") proxima();
	}
</script>

<svelte:window onkeydown={handleKey} />
<div
	class="overflow-hidden space-y-6 p-6 outline-none h-full flex flex-col items-center w-full relative">
	{#key index}
		<div
			in:fly={{ y: 100, duration: 500 }}
			out:fly={{ y: 50, duration: 500 }}
			class="absolute inset-0">
			<h2 class="text-xl font-bold text-[#091c53]">Tema: {current.tema}</h2>

			{#if stage === "pergunta" || stage === "resposta"}
				<p class="text-2xl" transition:fade>{index + 1}. {current.pergunta}</p>

				<div class="grid grid-cols-2 gap-4 mt-4">
					{#each current.alternativas as alt, i}
						<div
							class="alt-item p-4 rounded-2xl bg-[#cee6fd] shadow-sm"
							style="animation-delay: {i * delay}s">
							<span class="font-bold">{String.fromCharCode(65 + i)})</span
							><br />
							{alt}
						</div>
					{/each}
				</div>
			{/if}

			{#if stage === "resposta"}
				<div class="mt-4 p-4 rounded-xl border bg-green-100" transition:fade>
					Resposta correta: {current.alternativas[current.resposta]}
				</div>
			{/if}

			<p class="text-sm text-gray-500 mt-4">Aperte Enter para avançar</p>
		</div>
	{/key}
</div>

<style>
	.alt-item {
		opacity: 0;
		animation: flyIn 0.8s forwards ease-out;
		transform: translateY(10px);
	}

	@keyframes flyIn {
		from {
			opacity: 0;
			transform: translate3d(0, 10px, 0);
		}

		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}
</style>
