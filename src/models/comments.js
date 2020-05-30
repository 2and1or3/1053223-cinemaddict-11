

class Comments {
  constructor() {
    this._comments = {};
  }

  setComments(comments, id) {
    this._comments[id] = comments;
  }

  deleteComment(filmId, commentIndex) {
    const comments = this._comments[filmId];
    comments.splice(commentIndex, 1);
  }

  addComment(filmId, newComment) {
    const comments = this._comments[filmId];
    comments.push(newComment);
  }
}

export default Comments;
