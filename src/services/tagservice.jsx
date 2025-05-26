const production = process.env.productionurl
const development = process.env.developmenturl
export const GetAllTags = async () => {
  try {
    const resp = await fetch(`${production}api/tag/getAlltag`);
    const data = await resp.json();
    return {
      status: resp.status,
      data,
    };
  } catch (error) {
    console.error("Error fetching post", error);
    return null;
  }
};

