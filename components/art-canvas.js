import { useEffect, useRef } from "react"
import random from "canvas-sketch-util/random"
import Pen from "../helpers/pen"

export default () => {
	const canvas = useRef(null)

	useEffect(() => {
		const context = canvas.current.getContext("2d")
		setup(context)
	})

	return (
		<>
			<canvas ref={canvas} width={1480} height={600} />
			<style jsx>{`
				canvas {
					max-width: 100%;
				}
			`}</style>
		</>
	)
}

const palette = {
	colors: ["#000D3A", "#00B674", "#1BA3DE", "#711BDE"],
	randomColor() {
		return this.colors[Math.floor(Math.random() * this.colors.length)]
	}
}

const setup = context => {
	random.setSeed(random.getRandomSeed())

	const width = 1480,
		height = 600,
		numberOfSegments = 60,
		totalCircles = 40
	const circleIncrement = (Math.PI * 2) / numberOfSegments

	context.fillStyle = "white"
	context.fillRect(0, 0, width, height)

	const pen = new Pen(context)
	pen.lineWidth = 2
	pen.sizeJitter = 0.3
	pen.dryness = 0.9
	const jotShape = drawShape(context, pen, circleIncrement)

	for (let step = 0; step < totalCircles; step++) {
		const radius = random.range(40, 90)
		const x = random.range(radius * 1.2, width - radius * 1.2)
		const y = random.gaussian(height / 2, height / 10)
		context.strokeStyle = palette.randomColor()
		context.fillStyle = context.strokeStyle
		jotShape(x, y, radius)
	}
}

const drawShape = (context, pen, circleIncrement) => (x, y, radius) => {
	const circleFromCenter = random.chance(0.2)
	const square = circleFromCenter ? false : random.chance(0.6)
	const squareHatched = square ? random.chance(0.3) : false

	const fraction = random.range(1 / 8, 1 / 2)
	const rotationOffset = random.range(0, Math.PI * 2)

	context.save()
	context.translate(x, y)
	context.rotate(rotationOffset)
	pen.moveTo(0, radius)

	if (square) {
		if (!squareHatched)
			context.fillRect(-radius / 2, -radius / 2, radius, radius)
		pen.moveTo(-radius / 2, -radius / 2)
		pen.lineTo(radius / 2, -radius / 2)
		pen.lineTo(radius / 2, radius / 2)
		pen.lineTo(-radius / 2, radius / 2)
		pen.lineTo(-radius / 2, -radius / 2)
	} else {
		for (let i = 0; i < Math.PI * 2 * fraction; i += circleIncrement) {
			pen.moveTo(0, 0)
			pen.lineTo(Math.sin(i) * radius, Math.cos(i) * radius)
		}
	}
	context.restore()
}
