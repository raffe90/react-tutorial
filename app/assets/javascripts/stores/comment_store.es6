import AppDispatcher from '../app_dispatcher';
import Constants from '../constants';

class CommentStore extends EventEmitter {
  constructor() {
    super()
    this._comments = []

    AppDispatcher.register((payload) => {
      switch(payload.actionType) {
        case Constants.ADD_COMMENT:
          this.addComment(payload.comment)
          this.emitChange()
          break;
        case Constants.SET_COMMENTS:
          this.setComments(payload.comment)
          this.emitChange()
          break;
        case Constants.UPVOTE_COMMENT:
          // console.log(payload.comment)
          this.upvote(payload.comment)
          this.emitChange()
          break;
        default:
          // NO-OP
      }
    });
  }

  addComment(comment) {
    this._comments[comment.id || this._comments.length] = comment;
    // console.log(this._comments)
  }

  setComments(comments){
    comments.forEach(comment => {
      this.addComment(comment)
    })
  }

  upvote(comment){
    this._comments[comment.id].rank++
  }

  comments(parentId) {
    return this._comments.filter(c => {return c && c.parent_id === parentId});
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(Constants.CHANGE_EVENT);
  }
}

export default CommentStore;
