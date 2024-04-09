import config from "config";

export const getPosts = async () => {
    try {
        const response = await fetch(`${config}/posts`, {
            cache: 'no-store'
        });
      
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
      
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error)
    }
};