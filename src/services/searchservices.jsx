const production = process.env.productionurl
const development = process.env.developmenturl
export const GetPostbysearch = async (searchitem) => {
  try {
    const resp = await fetch(`${production}api/search?query=${searchitem}`);
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