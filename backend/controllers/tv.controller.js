import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTv =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomTv });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
    console.error(error);
  }
}

export async function getTrailers(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      console.error(error.message);
      return res
        .status(404)
        .json({ success: false, message: "Tv series not found" });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
    console.error(error);
  }
}

export async function getTvDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    return res.status(200).json({ success: true, details: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "Tv series not found" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSimilarTvs(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    if(error.message.includes("404")){
        return res.status(404).json({success:false,message:"Similar Tv series Not Found"})
    }
    return res.status(500).json({success:false,message:"Internal Server Error"})
  }
}

export async function getTvsByCategory(req,res){
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        return res.status(200).json({success:true,content:data.results})
    } catch (error) {
        if(error.message.contains("404")){
            return res.status(404).json({success:false,message:"Category Not Found"});
        }
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}