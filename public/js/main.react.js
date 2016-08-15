var PostList = React.createClass({
  getInitialState: function(){
    return {
      posts: []
    };
  },
  componentDidMount: function(){
    var that=this;
    this.socket = io();
    $.get('/initialstate',function(posts){
        that.setState({posts:posts});
    });
    this.socket.on('new Tweet',function(post){
      // console.log(posts);
      var posts = that.state.posts;
      console.log(posts);
      posts.push(post);
      that.setState({posts:posts});
    });

  },
  render: function(){
    if(this.state.posts){
    var posts = this.state.posts.map(function(post){
        return(<Post post={post} />);
      });
    };
    return(
      <div>
        <h2>Tweets:</h2>
        <div className="PostList">
          {posts}
        </div>
      </div>
    );
  }
});

var Post = React.createClass({
  render: function(){
    var postContent = this.props.post;
    return(
        <div>{postContent.author}</div>
    );
  }
});

ReactDOM.render(
  <PostList/>,
  document.getElementById('container')
);
