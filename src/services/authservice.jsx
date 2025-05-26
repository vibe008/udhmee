const production = process.env.productionurl
const development = process.env.developmenturl
export const registerUser = async (userData) => {
  try {
    console.log("userDataapi", userData)
    const res = await fetch(`${production}api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    const data = await res.json()
    return {
      status: res.status,
      data,
    }
  } catch (error) {

  }

};


export const loginUser = async (userData) => {
  try {
    const res = await fetch(`${production}api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // to send cookies
      body: JSON.stringify(userData),
    });
    const data = await res.json()
    return {
      status: res.status,
      data,
    }
  } catch (error) {
    console.log("error", error)
  }
};