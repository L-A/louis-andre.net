import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "./styled-link";

const Markdown = ({ children }) => (
	<ReactMarkdown
		remarkPlugins={[remarkGfm]}
		components={{
			a: (props) => <Link {...props} />,
		}}
	>
		{children}
	</ReactMarkdown>
);

export default Markdown;
