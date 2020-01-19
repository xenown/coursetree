import React, { Component } from 'react'

import data from '../CS_res.json'
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';

class CourseOrgChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nodeTotal: 0
    }
  }
  CourseNode = ({ node }) => {
    return (
      <div className="card course-node" > {node.nodeIndex}
        <div className="card-header card-header course-node-title" onClick={() => this.props.handleClick(node.id)}> {node.code} </div>
        <div className="card-body course-node-body" onClick={() => this.props.handleClick(node.id)}> {node.name} </div>
        <div className="expand-children card-footer" onClick={() => this.buildTree(node.code)} > Prereqs ({node.prereq.length}) </div>
      </div>

    );
  };
  buildTree(coursename) {
    let tempData = JSON.parse(JSON.stringify(data.filter(course => course.code === coursename)))
    let rootNode = JSON.parse(JSON.stringify(tempData[0]))
    rootNode.nodeIndex = this.state.nodeTotal++
    if (rootNode) {
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