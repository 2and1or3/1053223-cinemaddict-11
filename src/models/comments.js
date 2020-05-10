

class Comments {
  constructor() {
    this._comments = {};

    this._commentsChangeHandlers = [];
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  getComments(id) {
    return this._comments[id];
  }

  setComments(comments, id) {
    this._comments[id] = comments;
  }

  deleteComment(filmId, commentIndex) {
    const comments = this._comments[filmId];
    comments.splice(commentIndex, 1);
    this._callHandlers(this._commentsChangeHandlers);
  }

  addComment(filmId, newComment) {
    const comments = this._comments[filmId];
    comments.push(newComment);
    this._callHandlers(this._commentsChangeHandlers);
  }

  addCommentsChangeHandler(cb) {
    this._commentsChangeHandlers.push(cb);
  }
}

export default Comments;
