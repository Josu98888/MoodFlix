import { MOOD_SEARCH_MAP } from './data.js';

// api.js: función para obtener recomendaciones desde iTunes API
export async function fetchRecommendations(mood) {
    const term = encodeURIComponent(MOOD_SEARCH_MAP[mood] ?? mood);
    const url = `https://itunes.apple.com/search?term=${term}&media=music&entity=album&limit=20`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

    const data = await res.json();

    if (!data.results || data.results.length === 0) return [];

    return data.results
        .filter(album => album.wrapperType === 'collection')
        .map((album, i) => {
            const durationMin = (album.trackCount ?? 10) * 3;
            const durationStr = durationMin < 60
                ? `${durationMin}min`
                : `${Math.floor(durationMin / 60)}h ${durationMin % 60}min`;

            return {
                mood,
                title: album.collectionName,
                artist: album.artistName ?? '',
                duration: durationStr,
                durationMin: durationMin,
                genre: album.primaryGenreName ?? 'Música',
                type: 'Álbum',
                badgeClass: 'music',
                icon: '🎵',
                img: (album.artworkUrl100 ?? '').replace('100x100bb', '400x400bb'),
                featured: i === 0,
            };
        });
}