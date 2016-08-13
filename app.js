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

const CommentForm = React.createClass({
  render: function () {
    return (
      <div className="commentForm">
        This is the Comment Form!
      </div>
    );
  }
});

const data = [
  { author: 'YourName' ,
    text: 'Coolio'
  },
  { author: 'NotYourName', 
    text: 'Something'
  }
]

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
      )
    })
    return (
      <div className="commentList">
        { commentNodes }
      </div>
    );
  }
});

const CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <CommentForm />
        <CommentList 
          data={data}
        />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('app')
);