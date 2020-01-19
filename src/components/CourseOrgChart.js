import React, { Component } from 'react'

import data from '../res.json'
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyleSets, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

class CourseOrgChart extends Component {
  nodeTotal = 0
  constructor(props) {
    super(props)
    this.state = {
      root: "",
      courseTree: {},
      courseTreeCollapse: {},
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
      <div className="card course-node" >
        <div className="card-header course-node-title" onClick={() => this.props.handleClick(node.code)}>
          <div className="course-node-name">{node.code}</div>
          <div className="course-node-flag">
            {
              node.offered.map((term, index) => {
                switch (term) {
                  case "F":
                    return <FontIcon key={index} iconName="SingleBookmarkSolid" className={this.classNames.red} >F</FontIcon>
                  case "W":
                    return <FontIcon key={index} iconName="SingleBookmarkSolid" className={this.classNames.blue} >W</FontIcon>
                  case "S":
                    return <FontIcon key={index} iconName="SingleBookmarkSolid" className={this.classNames.green} >S</FontIcon>
                  default:
                    return null;
                }
              })
            }
          </div>
        </div>
        <div className="card-body course-node-body" onClick={() => this.props.handleClick(node.code)}> {node.name} </div>
        <div className="expand-children card-footer" onClick={() => this.collapse(node.nodeIndex, this.state.courseTree, this.state.courseTreeCollapse)} > Prereqs ({node.prereq.length}) </div>
      </div>

    );
  };

  collapse(index, treeRoot, collapseRoot) {
    if (treeRoot.nodeIndex === index) {
      if (collapseRoot.children.length !== 0) {
        collapseRoot.children = []
        console.log("Hide children")
      } else {
        let newChildren = JSON.parse(JSON.stringify(treeRoot.children))
        for (let childCourse of newChildren) {
          childCourse.children = []
        }
        collapseRoot.children = newChildren
        console.log("Show children")
      }
      let tempObj = JSON.stringify(this.state.courseTreeCollapse)
      this.setState({ courseTreeCollapse: {} })
      this.setState({ courseTreeCollapse: JSON.parse(tempObj) })
    } else {
      if (collapseRoot && treeRoot) {
        for (let child in treeRoot.children) {
          this.collapse(index, treeRoot.children[child], collapseRoot.children[child])
        }
      }
    }
  }

  buildTree(coursename) {
    // let tempData = JSON.parse(JSON.stringify(data.filter(course => course.code === coursename)))
    // let tempData = JSON.parse(JSON.stringify());
    let rootNode = JSON.parse(JSON.stringify(data[coursename]))
    rootNode["nodeIndex"] = this.nodeTotal++
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

  init() {
    console.log("Initialize")

    this.state.nodeTotal = 0
    this.state.courseTree = this.buildTree(this.props.courseRoot)
    this.state.courseTreeCollapse = JSON.parse(JSON.stringify(this.state.courseTree))
    for (let childCourse of this.state.courseTreeCollapse.children) {
      childCourse.children = []
    }
    this.setState({ root: this.props.courseRoot })
  }

  render() {
    console.log("Rendering")
    //console.log(this.state.root + " " + this.props.rootNode)
    if (this.state.root !== this.props.courseRoot) { this.init() }

    return (
      <div className="course-org-chart card">
        <OrgChart tree={this.state.courseTreeCollapse} NodeComponent={this.CourseNode} />
      </div>

    )
  }
}

export default CourseOrgChart