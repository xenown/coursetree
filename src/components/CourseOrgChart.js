import React, { Component } from 'react'

import data from '../CS_res.json'
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';

class CourseOrgChart extends Component {
  CourseNode = ({ node }) => {
    return (
      <div className="card course-node" onClick={() => this.props.handleClick(node.id)}>
        <div className="card-header card-header course-node-title"> {node.code} </div>
        <div className="card-body course-node-body"> {node.name} </div>
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
        let childTree = this.buildTree(childCourse)
        if (childTree) {
          rootNode.children.push(childTree)
        }
      }
    }
    console.log(rootNode)
    return rootNode
  }
  render() {
    let courseTree = this.buildTree(this.props.courseRoot)
    return (
      <div className="course-org-chart card">
        <OrgChart tree={courseTree} NodeComponent={this.CourseNode} />
      </div>

    )
  }
}

export default CourseOrgChart