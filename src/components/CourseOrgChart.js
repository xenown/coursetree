import React, {Component} from 'react'

import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';
import CourseNode from './CourseNode'

const courseTree = {
  courseName: "Logic but with computers or Something",
  courseCode: "SE-212",
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
    render () {
      return (
          <div class="course-org-chart card">
              <OrgChart tree={courseTree} NodeComponent={CourseNode} />
          </div>
          
      )      
    }   
}

export default CourseOrgChart