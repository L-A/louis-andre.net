import fetch from "isomorphic-unfetch"

const postsOptions = [{ arg: "results", value: 200 }]

const PinboardRequest = async (method, args = []) => {
	const argsString = args.reduce((currentString, { arg, value }) => {
		return `${currentString}&${arg}=${value}`
	}, "")
	const response = await fetch(
		`https://api.pinboard.in/v1/${method}?auth_token=${process.env.PINBOARD_USER}:${process.env.PINBOARD_KEY}&format=json${argsString}`
	)
	const responseData = await response.json()
	return responseData
}

export default async (_req, res) => {
	res.setHeader("Content-Type", "application/json")
	res.setHeader("Cache-Control", `max-age=${180 * 60}, public`) // 3 hours caching
	res.statusCode = 200

	const pinboardInfo = await PinboardRequest("posts/all", postsOptions)
	const answer = {
		links: pinboardInfo
	}

	res.end(JSON.stringify(answer))
}
