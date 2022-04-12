export function create_scale(domain, range) {
	const multiplier = (range[1] - range[0]) / (domain[1] - domain[0]);

	return (value) => {
		return range[0] + multiplier * (value - domain[0]);
	};
}
