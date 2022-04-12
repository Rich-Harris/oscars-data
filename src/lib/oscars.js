import data from './oscars.csv';

export default data.map((row) => {
	return {
		year: +row.oscar_yr,
		award: row.award,
		name: row.name,
		movie: row.movie,
		age: +row.age
	};
});
