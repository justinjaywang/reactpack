// components
var ProjectPreview = React.createClass({
  render: function() {
    return (
      <article className="projectPreview">
        <img className="projectPreview-image" src={this.props.thumbnail} />
        <h2 className="projectPreview-title">
          {this.props.title}
        </h2>
        <span className="projectPreview-student">
          {this.props.student}
        </span>
      </article>
    );
  }
});

var ProjectPreviewsGrid = React.createClass({
  pack: function() {

    var container = this.refs.projectPreviewsGrid.getDOMNode();
    // var container = document.querySelector(".projectPreviewsGrid");

    if (container) {
      imagesLoaded(container, function() {
        return new Packery(container, {
          itemSelector: ".projectPreview",
          gutter: 0
        });
      }.bind(this));
    }

  },
  componentDidMount: function() {
    setTimeout(this.pack, 0);
  },
  componentDidUpdate: function() {
    setTimeout(this.pack, 0);
  },
  render: function() {
    var filterText = this.props.filterText.toLowerCase(); // need to set variable first, since it's not accessible within map function
    var projectNodes = this.props.data.map(function(project) {
      if (project.title.toLowerCase().indexOf(filterText) !== -1) {
        return (
          <ProjectPreview student={project.student} title={project.title} thumbnail={project.thumbnail} />
        )
      }
    });
    return (
      <section className="projectPreviewsGrid" ref="projectPreviewsGrid">
        {projectNodes}
      </section>
    );
  }
});

var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.getDOMNode().value
    );
  },
  render: function() {
    return (
      <input
        className="searchBar"
        type="text"
        placeholder="Search"
        ref="filterTextInput"
        value={this.props.filterText}
        onChange={this.handleChange} />
    );
  }
});

var Projects = React.createClass({
  loadProjectsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data}); // the key to dynamic updates
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadProjectsFromServer();
    // setInterval(this.loadProjectsFromServer, this.props.pollInterval); // TO DO: possibly clean up, and pollInterval prop
  },
  getInitialState: function() {
    return {
      data: [],
      filterText: ''
    };
  },
  handleUserInput: function(filterText) {
    this.setState({
      filterText: filterText
    });
  },
  render: function() {
    return (
      <div className="page-wrap">
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput} />
        <ProjectPreviewsGrid filterText={this.state.filterText} data={this.state.data} />
      </div>
    );
  }
});

// render
React.render(
  <Projects url="/projects.json" pollInterval={2000} />,
  document.body
);