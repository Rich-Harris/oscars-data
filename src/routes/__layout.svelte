<script>
	import '../app.css';
</script>

<nav>
	Oscars winners •
	<a href="/table">table</a> •
	<a href="/chart">chart</a>
</nav>

<main>
	<slot />
</main>

<style>
	nav {
		text-align: center;
	}

	main {
		max-width: 56em;
		padding: 1em;
		margin: 0 auto;
	}
</style>
