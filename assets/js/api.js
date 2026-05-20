import { MOOD_SEARCH_MAP, MOOD_GHIBLI_MAP } from "./data.js";

// api fetch combinada para música y películas, con manejo de errores individualizado
export async function fetchRecommendations(mood, maxMinutes) {
  try {
    const [musicResults, movieResults] = await Promise.allSettled([
      fetchMusicRecommendations(mood),
      fetchMovieRecommendations(mood, maxMinutes),
    ]);

    const music = musicResults.status === "fulfilled" ? musicResults.value : [];

    const movies =
      movieResults.status === "fulfilled" ? movieResults.value : [];

    // intercalar resultados
    const merged = [];
    const maxLen = Math.max(music.length, movies.length);

    for (let i = 0; i < maxLen; i++) {
      if (music[i]) {
        merged.push(music[i]);
      }

      if (movies[i]) {
        merged.push(movies[i]);
      }
    }

    return merged;
  } catch (error) {
    console.error("Error en fetchRecommendations:", error.message);

    return [];
  }
}

// api fetch para películas de Studio Ghibli
export async function fetchMovieRecommendations(mood, maxMinutes) {
  try {
    const res = await fetch("https://ghibliapi.vercel.app/films");

    if (!res.ok) {
      throw new Error(`Ghibli API Error: ${res.status}`);
    }

    const films = await res.json();
    const keywords = MOOD_GHIBLI_MAP[mood] ?? [];

    return films
      .filter((film) => {
        const duration = parseInt(film.running_time) || 999;

        // filtro por tiempo
        if (maxMinutes !== 120 && duration > maxMinutes) {
          return false;
        }

        // filtro por mood
        if (keywords.length === 0) {
          return true;
        }

        const desc = (film.description ?? "").toLowerCase();

        return keywords.some((kw) => desc.includes(kw));
      })
      .map((film, i) => {
        const duration = parseInt(film.running_time) || 0;

        return {
          mood,
          title: film.title,
          artist: film.director ?? "",
          durationMin: duration,
          duration:
            duration < 60
              ? `${duration}min`
              : `${Math.floor(duration / 60)}h ${duration % 60}min`,
          genre: "Anime / Ghibli",
          type: "Película",
          badgeClass: "movie",
          icon: "🎬",
          img: film.image ?? "",
          featured: i === 0,
        };
      });
  } catch (error) {
    console.error("Error en fetchMovieRecommendations:", error.message);

    return [];
  }
}

// api fetch para álbumes de música de iTunes
export async function fetchMusicRecommendations(mood) {
  try {
    const term = encodeURIComponent(MOOD_SEARCH_MAP[mood] ?? mood);

    const url =
      `https://itunes.apple.com/search?term=${term}` +
      `&media=music&entity=album&limit=20`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`iTunes Error: ${res.status}`);
    }

    const data = await res.json();

    return (data.results ?? [])
      .filter((album) => album.wrapperType === "collection")
      .map((album, i) => {
        const durationMin = (album.trackCount ?? 10) * 3;

        return {
          mood,
          title: album.collectionName,
          artist: album.artistName ?? "",
          durationMin,
          duration:
            durationMin < 60
              ? `${durationMin}min`
              : `${Math.floor(durationMin / 60)}h ${durationMin % 60}min`,
          genre: album.primaryGenreName ?? "Música",
          type: "Álbum",
          badgeClass: "music",
          icon: "🎵",
          img: (album.artworkUrl100 ?? "").replace("100x100bb", "400x400bb"),
          featured: i === 0,
        };
      });
  } catch (error) {
    console.error("Error fetching music:", error);

    return [];
  }
}
