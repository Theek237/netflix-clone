import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=1`
    );
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({ success: true, searchresult: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "Person Not Found" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function searchMovie(req, res) {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=1`
    );
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({ success: true, searchresult: data.results });
  } catch (error) {
    console.error(error);
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "Movie Not Found" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function searchTv(req, res) {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=1`
    );
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({ success: true, searchresult: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "TV series Not Found" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSearchHistory(req, res) {
  try {
    if (req.user.searchHistory.length === 0) {
      return res
        .status(200)
        .json({ success: true, content: [], message: "No Search History" });
    }
    return res
      .status(200)
      .json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function deleteItemFromSearchHistory(req, res) {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(req.user._id,
      {
        $pull: {
          searchHistory: {
            id: parseInt(id),
          },
        },
      })
    return res
      .status(200)
      .json({ success: true, message: "Delete Successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
