class Comments {
  constructor() {
    this._comments = {};
  }

  set(comments, id) {
    this._comments[id] = comments;
  }

  delete(filmId, commentIndex) {
    const comments = this._comments[filmId];
    comments.splice(commentIndex, 1);
  }
}

export default Comments;
