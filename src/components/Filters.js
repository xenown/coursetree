import React, { Component } from 'react';
import '../App.css';
import { Panel } from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyleSets, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

class Filters extends Component {
  constructor(props) {
    super(props)
  }

  iconclassName = mergeStyles({
    fontSize: 15,
    height: 10,
    width: 10,
    marginLeft: 10
  });

  classNames = mergeStyleSets({
    red: [{ color: '#de4605' }, this.iconclassName],
    blue: [{ color: '#4884fe' }, this.iconclassName],
    green: [{ color: '#58810b' }, this.iconclassName]
  });

  _close = () => {
    this.props.toggleOpen()
  }

  determineSubtext() {
    switch (this.props.filter) {
      case "difficulty": return "Green course highlighting indicates lower course difficulty, while red indicates higher course difficulty."
      case "useful": return "Green course highlighting indicates most students found the course useful, while red indicates few students found the course useful."
      case "enjoyment": return "Green course highlighting indicates most students enjoyed the course, while red indicates few students found the course enjoyable"
    }
  }

  render() {
    return (
      <Panel isOpen={this.props.isOpen} onDismiss={this._close} className="ms-panel ms-Panel--left panel">

        <div className="filters-header"> Filters </div>
        <hr />
        <div className="filters-subtitle"> Term Availability</div>
        <div className="filters-subtext">
          These flags on the card of a course indicate term availability of that course!
            </div>
        <div>
          <FontIcon iconName="SingleBookmarkSolid" className={this.classNames.red + " flag-sub-head"} >F</FontIcon>
          <span className="flag-label">
            Available in the
              </span>
          <span className="flag-fall"> Fall </span>
        </div>
        <div>
          <FontIcon iconName="SingleBookmarkSolid" className={this.classNames.blue + " flag-sub-head"} >W</FontIcon>
          <span className="flag-label">
            Available in the
              </span>
          <span className="flag-winter"> Winter </span>
        </div>
        <div>
          <FontIcon iconName="SingleBookmarkSolid" className={this.classNames.green + " flag-sub-head"} >S</FontIcon>
          <span className="flag-label">
            Available in the
              </span>
          <span className="flag-spring"> Spring </span>
        </div>
        <hr />
        <div className="filters-subtitle"> Student Experience </div>
        <div className="filters-subtext">
          Select a filter to color code the Course Tree!
            </div>
        <div>
          <div className="radio">
            <label>
              <div className="filter-option">
                <input type="radio" name="optradio" checked={this.props.filter === "difficulty"} onChange={() => this.props.handleFilter("difficulty")} /> <span className="bold-option"> Difficulty </span>
              </div>
              <div className="filter-option">
                <input type="radio" name="optradio" checked={this.props.filter === "useful"} onChange={() => this.props.handleFilter("useful")} /> <span className="bold-option"> Useful </span>
              </div>
              <div className="filter-option">
                <input type="radio" name="optradio" checked={this.props.filter === "enjoyment"} onChange={() => this.props.handleFilter("enjoyment")} /> <span className="bold-option"> Enjoyment </span>
              </div>
            </label>
          </div>
        </div>
        <div className="filters-subtext">
          {this.determineSubtext()}
        </div>
      </Panel >
    )
  }
}

export default Filters;