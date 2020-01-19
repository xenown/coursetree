import React, { Component } from 'react'

import data from '../CS_res.json'
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';

class CourseOrgChart extends Component {
  constructor(props){
    super(props)
    this.state = {
      nodeTotal: 0
    }
  }
  CourseNode = ({ node }) => {
    return (
      <div className="card course-node" onClick={() => this.props.handleClick(node.id)}>
        <div class="card-header card-header course-node-title"> {node.code} </div>
        <div class="card-body course-node-body"> {node.name} </div>
        <div class="expand-children card-footer" onClick = {() => this.buildTree(node.code)} > Prereqs ({node.prereq.length}) </div>
      </div>
      
    );
  };
  buildTree(coursename) {
    console.log("Building Tree")
    let tempData = data.filter(course => course.code == coursename)
    let rootNode = tempData[0];
    if (rootNode && rootNode.children.length == 0) {
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
      <div class="course-org-chart card">
        <OrgChart tree={courseTree} NodeComponent={this.CourseNode} />
      </div>

    )
  }
}

export default CourseOrgChart