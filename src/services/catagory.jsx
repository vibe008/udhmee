const production = process.env.productionurl
const development = process.env.developmenturl
export const GetAllcatagory = async () => {
  try {
    const resp = await fetch(`${production}api/catagory/GetAllcatagory`);
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

