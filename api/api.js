
// Search Anime endpoint
export const searchAnime = async (searchTerm) => {
    console.log("In server", searchTerm);
    const response = await fetch(`https://dex-consumet-api.vercel.app/anime/gogoanime/${searchTerm}?page=1`);
    const data = await response.json();
    console.log(data);
    return data;
};

// Getting top airing
export const getTopAiring = async () => {
    const response = await fetch(`https://dex-consumet-api.vercel.app/anime/gogoanime/top-airing`);
    const data = await response.json();
    // console.log(data);
    return data;
};