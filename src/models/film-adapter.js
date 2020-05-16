class FilmAdapter {
  constructor(film) {
    this.id = film.id;
    this.comments = film.comments;
    this.title = film.film_info.title;
    this.originalTitle = film.film_info.alternative_title;
    this.rating = film.film_info.total_rating;
    this.poster = film.film_info.poster;
    this.ageLimit = film.film_info.age_rating;
    this.team = {
      director: film.film_info.director,
      scenarists: film.film_info.writers,
      cast: film.film_info.actors,
    };
    this.date = film.film_info.release.date;
    this.country = film.film_info.release.release_country;
    this.duration = film.film_info.runtime;
    this.genres = film.film_info.genre;
    this.description = film.film_info.description;

    this.isWatchList = film.user_details.watchlist;
    this.isFavorite = film.user_details.favorite;
    this.isWatched = film.user_details.already_watched;

    this.watchDate = film.user_details.watching_date;
  }

  static parseFilm(film) {
    return new FilmAdapter(film);
  }

  static parseFilms(films) {
    return films.map((film) => FilmAdapter.parseFilm(film));
  }

  static parseComment(comment) {
    const localComment = {
      id: comment.id,
      author: comment.author,
      text: comment.comment,
      date: comment.date,
      emotion: comment.emotion,
    };

    return localComment;
  }

  static parseComments(comments) {
    return comments.map((comment) => FilmAdapter.parseComment(comment));
  }

  static toRAWFilm(film) {
    const rawFilm = {
      "id": film.id,
      "comments": film.comments,
      "film_info": {
        "title": film.title,
        "alternative_title": film.originalTitle,
        "total_rating": film.rating,
        "poster": film.poster,
        "age_rating": film.ageLimit,
        "director": film.team.director,
        "writers": film.team.scenarists,
        "actors": film.team.cast,
        "release": {
          "date": film.date,
          "release_country": film.country
        },
        "runtime": film.duration,
        "genre": film.genres,
        "description": film.description
      },
      "user_details": {
        "watchlist": film.isWatchList,
        "already_watched": film.isWatched,
        "watching_date": film.watchDate,
        "favorite": film.isFavorite
      }
    };

    return rawFilm;
  }
}

export default FilmAdapter;
