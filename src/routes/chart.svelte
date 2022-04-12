<script>
	import data from '$lib/oscars.js';
	import { create_scale } from '$lib/scale';
	import { quadtree } from 'd3-quadtree';

	let w = 0;
	let h = 0;
	let chart;
	let closest;

	$: x = create_scale([1929, 2019], [0, w]);
	$: y = create_scale([0, 100], [h, 0]);

	$: qt = quadtree()
		.x((row) => x(row.year))
		.y((row) => y(row.age))
		.addAll(data);
</script>

<h1>Best actor and actress winners, 1929—2019</h1>

<div
	class="chart"
	bind:this={chart}
	bind:clientWidth={w}
	bind:clientHeight={h}
	on:mousemove={(event) => {
		const { left, top } = chart.getBoundingClientRect();
		const x = event.clientX - left;
		const y = event.clientY - top;

		closest = qt.find(x, y, 50);
	}}
>
	<svg>
		<!-- horizontal grid lines -->
		{#each [10, 20, 30, 40, 50, 60, 70, 80, 90] as age}
			<g transform="translate(0, {y(age)})">
				<text text-anchor="end" x={-5}>{age}</text>
				<line x1="0" x2={w} />
			</g>
		{/each}

		<!-- vertical grid lines -->
		{#each w < 640 ? [1940, 1960, 1980, 2000] : [1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010] as year}
			<g transform="translate({x(year)}, 0)">
				<text y={h + 10} text-anchor="middle">{year}</text>
				<line y1="0" y2={h} />
			</g>
		{/each}

		{#each data as row}
			<circle class={row.award} cx={x(row.year)} cy={y(row.age)} r={4} />
		{/each}

		{#if closest}
			<circle class={closest.award} cx={x(closest.year)} cy={y(closest.age)} r={7} stroke="black" />
		{/if}
	</svg>

	{#if closest}
		<div class="info" style="transform: translate({x(closest.year)}px, {y(closest.age)}px)">
			<div class="info-content" style="transform: translate({-100 * (x(closest.year) / w)}%, 0)">
				<span>{closest.year} — {closest.movie}</span>
				<strong>{closest.name}, {closest.age}</strong>
			</div>
		</div>
	{/if}
</div>

<p class="source">
	Source: <a href="https://www.openintro.org/data/index.php?data=oscars">openintro.org</a>
</p>

<style>
	.chart {
		margin: 0 0 4rem 1rem;
	}

	svg {
		width: 100%;
		height: 400px;
		overflow: visible;
	}

	.actor {
		fill: var(--best-actor);
	}

	.actress {
		fill: var(--best-actress);
	}

	line {
		stroke: #eee;
	}

	text {
		font-size: 14px;
		fill: #666;
		dominant-baseline: middle;
	}

	.info {
		position: absolute;
		top: 0;
		left: 0;
	}

	.info-content {
		position: absolute;
		bottom: 1rem;
		white-space: pre;
		filter: drop-shadow(0 0 3px white) drop-shadow(0 0 3px white) drop-shadow(0 0 3px white)
			drop-shadow(0 0 3px white) drop-shadow(0 0 3px white);
	}

	strong {
		display: block;
	}
</style>
