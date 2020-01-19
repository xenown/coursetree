import React, {Component} from 'react'

const CourseNode = ({node}) => {
    return (
      <div className="card course-node" onClick={() => alert("Open the Course Description Modal")}>
        <div className="card-header card-header course-node-title"> {node.courseCode} </div>
        <div className="card-body course-node-body"> {node.courseName} </div>
      </div>
    );
};



export default CourseNode