import React, { Component } from 'react'

import data from '../CS_res.json'
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyleSets, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

class CourseOrgChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nodeTotal: 0
    }
  }

  iconClass = mergeStyles({
    fontSize: 15,
    height: 10,
    width: 10,
    marginLeft: 10
  });

  classNames = mergeStyleSets({
    red: [{ color: '#de4605' }, this.iconClass],
    blue: [{ color: '#4884fe' }, this.iconClass],
    green: [{ color: '#58810b' }, this.iconClass]
  });

  CourseNode = ({ node }) => {
    return (
      <div className="card course-node" > {node.nodeIndex}
        <div className="card-header card-header course-node-title" onClick={() => this.props.handleClick(node.id)}>
          <div className="course-node-name">{node.code}</div>
          <div className="course-node-flag">
            {node.offered.map((term) => {
              switch (term) {
                case "F":
                  return <FontIcon iconName="SingleBookmarkSolid" className={this.classNames.red} >F</FontIcon>
                case "W":
                  return <FontIcon iconName="SingleBookmarkSolid" className={this.classNames.blue} >W</FontIcon>
                case "S":
                  return <FontIcon iconName="SingleBookmarkSolid" className={this.classNames.green} >S</FontIcon>
              }
            })}
          </div>
        </div>
        <div className="card-body course-node-body" onClick={() => this.props.handleClick(node.id)}> {node.name} </div>
        <div className="expand-children card-footer" onClick={() => this.buildTree(node.code)} > Prereqs ({node.prereq.length}) </div>
      </div>

    );
  };
  buildTree(coursename) {
    console.log("Building Tree");
    console.log(coursename);
    let tempData = data.filter(course => course.code === coursename)
    let rootNode = tempData[0];
    if (rootNode && rootNode.children.length === 0) {
      for (let childCourse of rootNode.prereq) {
        let childTree = JSON.parse(JSON.stringify(this.buildTree(childCourse)))
        if (childTree) {
          rootNode.children.push(childTree)
        }
      }
    }
    return rootNode
  }
  render() {
    this.state.nodeTotal = 0
    let courseTree = this.buildTree(this.props.courseRoot)
    return (
      <div className="course-org-chart card">
        <OrgChart tree={courseTree} NodeComponent={this.CourseNode} />
      </div>

    )
  }
}

export default CourseOrgChart