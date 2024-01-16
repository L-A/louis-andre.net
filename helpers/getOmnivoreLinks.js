import fetch from "isomorphic-unfetch";

const gqlQuery = (cursor) => `query AllSaved{
  search(
    first: 25,
    after: "${cursor}"
  ) {
    ...on SearchSuccess {
      edges {
        cursor
        node {
          id
          title
          slug
          url
          isArchived
        }
      }
      pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
          totalCount
      }
    }
  }
}`;

const omnivoreRequest = async (cursor = 0) => {
	const query = await fetch("https://api-prod.omnivore.app/api/graphql", {
		body: "query Viewer { me { id name } }",
		method: "POST",
		headers: {
			authorization: process.env.OMNIVORE_TOKEN,
			"content-type": "application/json",
		},
	});
	const result = await query.text();
	console.log(result);

	return { links: [] };
};

export default async () => {
	const links = await omnivoreRequest();
	return links;
};
