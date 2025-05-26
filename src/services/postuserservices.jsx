const production = process.env.productionurl
const development = process.env.developmenturl
export const GetStorysUser = async (id) => {
  try {
    const resp = await fetch(`${production}api/user/getPostUser/${id}`);
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