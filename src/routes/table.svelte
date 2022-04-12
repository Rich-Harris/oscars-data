<script>
	import data from '$lib/oscars.js';

	const filters = ['Best actor', 'Best actress', null];

	const sorters = {
		year: (a, b) => a.year - b.year,
		name: (a, b) => (a.name < b.name ? -1 : 1),
		movie: (a, b) => (a.movie < b.movie ? -1 : 1),
		age: (a, b) => a.age - b.age
	};

	let sort_field = 'year';
	let filter = null;

	$: sorted = data
		.filter((row) => {
			if (filter) {
				return row.award === filter;
			}

			return true;
		})
		.sort(sorters[sort_field]);
</script>

<h1>Best actor and actress winners, 1929—2019</h1>

<div class="header row">
	<button
		aria-label="Award"
		class="filter {filter}"
		on:click={() => {
			let index = filters.indexOf(filter);
			index += 1;
			index %= filters.length;
			filter = filters[index];
		}}
	/>

	<button
		aria-sort={sort_field === 'year' ? 'ascending' : undefined}
		on:click={() => (sort_field = 'year')}
	>
		Year
	</button>

	<button
		aria-sort={sort_field === 'name' ? 'ascending' : undefined}
		on:click={() => (sort_field = 'name')}
	>
		Winner
	</button>

	<button
		aria-sort={sort_field === 'movie' ? 'ascending' : undefined}
		on:click={() => (sort_field = 'movie')}
	>
		Movie
	</button>

	<button
		aria-sort={sort_field === 'age' ? 'ascending' : undefined}
		on:click={() => (sort_field = 'age')}
	>
		Age
	</button>
</div>

{#each sorted as row}
	<div class="data row {row.award}">
		<span>{row.award}</span>
		<span>{row.year}</span>
		<span>{row.name}</span>
		<span>{row.movie}</span>
		<span>{row.age}</span>
	</div>
{/each}

<p class="source">
	Source: <a href="https://www.openintro.org/data/index.php?data=oscars">openintro.org</a>
</p>

<style>
	.row {
		display: grid;
		grid-template-areas: 'award year name age';
		grid-template-columns: 1.5rem 3.5rem 1fr 3.5rem;
		grid-gap: 1rem;
		align-items: center;
		padding: 0.2rem;
	}

	.data.row:hover {
		background: #f4f4f4;
	}

	button {
		background: none;
		border: none;
		font-size: 1.4rem;
		color: #777;
		padding: 0.2rem 0;
		cursor: pointer;
		user-select: none;
		text-align: left;
	}

	button.filter {
		background: linear-gradient(
			135deg,
			var(--best-actress),
			var(--best-actress) 50%,
			var(--best-actor) 50%,
			var(--best-actor)
		);
		width: 1.4rem;
		height: 1.4rem;
	}

	button.filter.actor {
		background: var(--best-actor);
	}

	button.filter.actress {
		background: var(--best-actress);
	}

	button[aria-sort='ascending'] {
		color: black;
	}

	span {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #444;
	}

	.row :nth-child(1) {
		grid-area: award;
		border-radius: 50%;
	}

	.data.row :nth-child(1) {
		width: 1rem;
		height: 1rem;
		text-indent: -9999px;
	}

	.actor :nth-child(1) {
		background-color: var(--best-actor);
	}

	.actress :nth-child(1) {
		background-color: var(--best-actress);
	}

	.row :nth-child(2) {
		grid-area: year;
	}

	.row :nth-child(3) {
		grid-area: name;
	}

	.row :nth-child(4) {
		grid-area: movie;
		display: none;
	}

	.row :nth-child(5) {
		grid-area: age;
	}

	@media (min-width: 640px) {
		.row {
			grid-template-areas: 'award year name movie age';
			grid-template-columns: 1.5rem 5rem 1fr 1fr 3rem;
		}

		.row :nth-child(4) {
			display: block;
		}
	}
</style>
