export const API_PARAMS = {
    api_key: 'dd4d819639705d332d531217b4f7c6b6',
    page: 1,
    language: 'en-US',
    region: 'US'
}
export enum API_URLS {
    NOW_PLAYING = 'https://api.themoviedb.org/3/movie/now_playing',
    ON_THE_AIR = 'https://api.themoviedb.org/3/tv/on_the_air',
    TOP_RATED_MOVIE = 'https://api.themoviedb.org/3/movie/top_rated',
    SEARCH_MOVIE = 'https://api.themoviedb.org/3/search/movie',
    TOP_RATES_WEB_SERIES = 'https://api.themoviedb.org/3/tv/top_rated',
    SEARCH_WEB_SERIES = 'https://api.themoviedb.org/3/search/tv',
    MOVIE_BY_ID = 'https://api.themoviedb.org/3/movie/',
    WEB_SERIES_BY_ID = 'https://api.themoviedb.org/3/tv/',
    RECOMMEND_MOVIES = 'https://api.themoviedb.org/3/movie/{ID}/recommendations',
    RECOMMEND_WEB_SERIES = 'https://api.themoviedb.org/3/tv/{ID}/recommendations',
    MOVIE_GENRE = 'https://api.themoviedb.org/3/genre/movie/list',
    GENRE_MOVIE_LIST = 'https://api.themoviedb.org/3/discover/movie'
}