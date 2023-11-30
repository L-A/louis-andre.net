import { TinaMarkdown } from "tinacms/dist/rich-text";
import StyledLink from "./styled-link";

const components = {
	a: ({ url, title, children }) => {
		return (
			<StyledLink href={url} title={title}>
				{children}
			</StyledLink>
		);
	},
};

const CustomTinaMarkdown = ({ content }) => {
	return <TinaMarkdown content={content} components={components} />;
};

export default CustomTinaMarkdown;
