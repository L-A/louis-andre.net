import fetch from "isomorphic-unfetch"

const postsOptions = [{ arg: "results", value: 200 }]

const PinboardRequest = async (method, args = postsOptions) => {
	const argsString = args.reduce((currentString, { arg, value }) => {
		return `${currentString}&${arg}=${value}`
	}, "")
	const response = await fetch(
		`https://api.pinboard.in/v1/${method}?auth_token=${process.env.PINBOARD_USER}:${process.env.PINBOARD_KEY}&format=json${argsString}`
	)
	const responseData = await response.json()
	return responseData
}

export default async () => {
	const pinboardInfo = await PinboardRequest("posts/all")
	return pinboardInfo
}
