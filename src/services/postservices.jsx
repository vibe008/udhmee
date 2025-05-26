const production = process.env.productionurl
const development = process.env.developmenturl
export const GetLatestPost = async () => {
  try {
    const resp = await fetch(`${production}api/posts/getlatestpost`);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error fetching post", error);
    return [];
  }
};

export const GetStorysbycatagorySlug = async (slug) => {
  try {
    const resp = await fetch(`${production}api/posts/getbycatagoryslug/${slug}`);
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
export const GetStorysbytagSlug = async (slug) => {
  try {
    const resp = await fetch(`${production}api/posts/getbytagslug/${slug}`);
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
export const GetStorysbySlug = async (slug) => {
  try {
    const resp = await fetch(`${production}api/posts/story/${slug}`);
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

export const GetStorysbyUserId = async (id) => {
  try {
    const resp = await fetch(`${production}api/posts/findbyuser/${id}`);
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