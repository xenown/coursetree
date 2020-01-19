import React, { Component } from 'react'

import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';

const courseTree = {
  courseName: "Logic but with computers or Something",
  courseCode: "SE-212",
  id: 12886,
  children: [
    {
      courseName: "Foundations of Sequential Programs",
      courseCode: "CS-241",
      children: [
        {
          courseName: "Intro to Logic and Mathematics",
          courseCode: "Math-135"
        }
      ]
    },
    {
      courseName: "A Very Advanced CS course",
      courseCode: "CS-341",
    },
  ]
};

class CourseOrgChart extends Component {
  CourseNode = ({ node }) => {
    return (
      <div className="card course-node" onClick={() => this.props.handleClick(node.id)}>
        <div class="card-header card-header course-node-title"> {node.courseCode} </div>
        <div class="card-body course-node-body"> {node.courseName} </div>
      </div>
    );
  };

  render() {
    return (
      <div class="course-org-chart card">
        <OrgChart tree={courseTree} NodeComponent={this.CourseNode} />
      </div>

    )
  }
}

export default CourseOrgChart