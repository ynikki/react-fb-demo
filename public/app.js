const CommentForm = React.createClass({
  getInitialState: function () {
    return { author: '', text: ''};
  },
  handleAuthorChange: function (e) {
    this.setState({ author: e.target.value });
  },
  handleTextChange: function (e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    // method that tells Javascript to not handle the native behavior.
    // allows your code to handle the way it should be.
    let author = this.state.author.trim();
    // trim trails leading & trailing white space.
    // if you use const, you should use let. don't use var.
    let text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author: author, text: text });
    this.setState({ author: '', text: ''});
  },
  render: function () {
    return (
      // when you see a submit event run my function. handleSubmit function
      <form className="commentForm" onSubmit={ this.handleSubmit }>
        <input 
          type="text" 
          placeholder="What's your name" 
          value={ this.state.author }
          onChange={ this.handleAuthorChange }
        />
        <input 
          type="text" 
          placeholder="Say your name" 
          value={ this.state.text }
          onChange={ this.handleTextChange }
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

const Comment = React.createClass({
  rawMarkup: function () {
    const md = new Remarkable();
    const rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };   
  },
  render: function () {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          { this.props.author }
        </h2>
        <span 
          dangerouslySetInnerHTML={ this.rawMarkup() }
        />
      </div>
    );
  }
});

const CommentList = React.createClass({
  render: function () {
    const commentNodes = this.props.data.map(function (comment, index){
      return (
        <Comment
          key={ index }
          author={ comment.author }
        >
          { comment.text }
        </Comment>
      );
    });
    return (
      <div className="commentList">
        { commentNodes.reverse() }
      </div>
    );
  }
});

const CommentBox = React.createClass({
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data });
        // takes an object that maps define, data.
        // this data refers to the key [], and the data refers to the argument.
        // this. refers to the compenents.
      }.bind(this), // scope changes, binding the scope of this compenent to this success function call.
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        // when it gets attached to the DOM.
      }.bind(this)
    });
  },
  handleCommentSubmit: function (comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    // Reactive State
    return { data: [] }
  },
  componentDidMount : function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    // set Interval starts it timer and it will call.
  },
  render: function() {
    return (
      <div className="commentBox">
        <CommentList data={ this.state.data } />
        <CommentForm onCommentSubmit={ this.handleCommentSubmit } />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={ 2000 }/>,
  document.getElementById('app')
);