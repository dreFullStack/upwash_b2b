export function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
			return -1;
	}
	if (b[orderBy] > a[orderBy]) {
			return 1;
	}
	return 0;
}

export function getComparator(order, orderBy) {
	return order === "desc"
			? function (a, b) { return descendingComparator(a, b, orderBy); }
			: function (a, b) { return -descendingComparator(a, b, orderBy); };
}

export function stableSort(array, comparator) {
	const stabilizedThis = array.map(function (el, index) { return [el, index]; });
	stabilizedThis.sort(function (a, b) {
		const order = comparator(a[0], b[0]);
			if (order !== 0) {
					return order;
			}
			return a[1] - b[1];
	});
	return stabilizedThis.map(function (el) { return el[0]; });
}