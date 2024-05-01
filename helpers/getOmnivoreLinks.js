import fetch from "isomorphic-unfetch";

const gqlQuery = (cursor = 0) => `query AllSaved{
  search(
    first: 100,
    after: "${cursor}"
  ) {
    ...on SearchSuccess {
      edges {
        cursor
        node {
          id
          title
          description
          slug
          url
          createdAt
          isArchived
          labels {
            name
            color
          }
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
		body: JSON.stringify({ query: gqlQuery() }),
		method: "POST",
		headers: {
			authorization: process.env.OMNIVORE_TOKEN,
			"content-type": "application/json",
		},
	});
	const result = await query.json();
	if (result.error) return { links: [] };
	else {
		const links = result.data.search.edges
			.map((n) => n.node)
			.filter((n) => n.isArchived);
		return { links };
	}
};

export default async () => {
	const links = await omnivoreRequest();
	return links;
};
