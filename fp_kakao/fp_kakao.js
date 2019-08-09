const inc = (obj, k) => {
	obj[k] = (obj[k] || 0) + 1
	return obj
}

console.log(inc(inc({}, 'a'), 'a'))