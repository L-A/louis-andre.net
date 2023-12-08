import { Palette } from "../config";
import CustomTinaMarkdown from "./custom-tina-markdown";

const dateOptions = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
};

const NoteEntry = ({ title, date, body, asList = true }) => {
	const formattedDate = new Date(date).toLocaleString("en-CA", dateOptions);

	const note = (
		<>
			<h2>{title}</h2>
			<h3>{formattedDate}</h3>
			<div>
				<CustomTinaMarkdown content={body} />
			</div>

			<style jsx>
				{`
					h2 {
						font-size: 16px;
						color: ${Palette.journal};
						margin: 0;
					}
					h3 {
						color: ${Palette.readingLink};
						font-size: 13px;
						font-weight: normal;
						margin: 0 0 -8px;
					}

					div {
						margin: 32px 0 64px;
						font-size: 20px;
					}
				`}
			</style>
		</>
	);

	if (asList) return <li>{note}</li>;
	else return <div>{note}</div>;
};

export default NoteEntry;
