import { random } from "canvas-sketch-util"

const sq = num => num * num

let drynessStep = 0

export default class {
	constructor(context) {
		if (!context) throw "No context provided"
		this.context = context
		this.currentPosition = { x: 0, y: 0 }
		this.scale = 1

		this.lineWidth = 1
		this.scatter = 0.5
		this.dryness = 0.02
		this.sizeJitter = 0.5
		this.drynessStrengthOnSize = 0.2
	}

	moveTo(x, y) {
		this.currentPosition = { x: x, y: y }
	}

	lineTo(destinationX, destinationY) {
		if (this.lineWidth == 0) return
		const x1 = this.currentPosition.x,
			y1 = this.currentPosition.y,
			x2 = destinationX,
			y2 = destinationY
		const distance = Math.sqrt(sq(x1 - x2) + sq(y2 - y1))
		const steps = distance / this.lineWidth
		const xIncrement = (x2 - x1) / steps
		const yIncrement = (y2 - y1) / steps
		if (distance == 0) return

		for (let step = 0; step <= steps; step++) {
			const drynessNoise = random.noise1D(drynessStep++) * 0.5 + 0.5
			const size =
				(this.lineWidth +
					random.range(-0.5, 0.5) * this.lineWidth * this.sizeJitter) *
				(1 - drynessNoise * this.drynessStrengthOnSize)
			const scatterX = random.range(-0.5, 0.5) * size * this.scatter
			const scatterY = random.range(-0.5, 0.5) * size * this.scatter
			this.context.save()
			this.context.beginPath()
			this.context.translate(x1 + xIncrement * step, y1 + yIncrement * step)
			this.context.ellipse(
				0 + scatterX,
				0 + scatterY,
				size,
				size,
				0,
				0,
				Math.PI * 2
			)
			this.context.fillStyle = this.context.strokeStyle
			this.context.fill()
			this.context.restore()
		}

		this.currentPosition = { x: destinationX, y: destinationY }
	}
}
