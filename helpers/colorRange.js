module.exports = (color1, color2, ratio) => {
	let r = Math.ceil(parseInt(color1.substring(0,2), 16) * ratio + parseInt(color2.substring(0,2), 16) * (1-ratio))
	let g = Math.ceil(parseInt(color1.substring(2,4), 16) * ratio + parseInt(color2.substring(2,4), 16) * (1-ratio))
	let b = Math.ceil(parseInt(color1.substring(4,6), 16) * ratio + parseInt(color2.substring(4,6), 16) * (1-ratio))
	let colorCombo = 	hex(r) + hex(g) + hex(b)
	return colorCombo 
}

const hex = (col) => {
	col = col.toString(16)
	return col.length == 1
		? "0" + col
		: col
}	
