import React, { Component } from 'react'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { List } from 'office-ui-fabric-react/lib/List';
import { PrimaryButton } from 'office-ui-fabric-react';

class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchText: "",
            searchResults: []
        }
    }

    courseData = [
        {
            "code": "CS 475 LAB,LEC,TST 0.50",
            "name": "Computational Linear Algebra",
            "prereq": "Prereq: AMATH 242/CS 371 or CS 370.",
            "note": "[Note: Lab is not scheduled and students are expected to find time in open hours to complete their work. Offered: S]",
            "course_id": "Course ID: 011444",
            "antireq": " Antireq: CS 372, 472",
            "description": "Basic concepts and implementation of numerical linear algebra techniques and their use in solving application problems. Special methods for solving linear systems having special features. Direct methods: symmetric, positive definite, band, general sparse structures, ordering methods.\nIterative methods: Jacobi, Gauss-Seidel, SOR, conjugate gradient. Computing and using orthogonal factorizations of matrices. QR and SVD methods for solving least squares problems. Eigenvalue and singular value decompositions. Computation and uses of these decompositions in practice. "
        }
    ]

    searchTextChange = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }

    filter = (e, text) => {
        console.log(text);
        this.setState({
            searchText: text,
            searchResults: text ? (text == "" ? [] : this.courseData.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0)) : [] 
        });
    }


    renderCell = (item, index) => {
        return (
            <div className="" data-is-focusable={true}>
                {/* <Image className={classNames.itemImage} src={item.thumbnail} width={50} height={50} imageFit={ImageFit.cover} /> */}
                <div id={index} className="">
                    <div className="Course Name">{item.name}</div>
                    {item.note == "" ? <div /> : <div className="">item.note</div>}
                    <div>{item.description}</div>
                </div>
                {/* <Icon className={classNames.chevron} iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} /> */}
            </div>
        );
    }

    render() {
        return (
            <div>
                CourseTree
                <SearchBox
                    placeholder="Search"
                    onSearch={newValue => console.log('value is ' + newValue)}
                    onFocus={() => console.log('onFocus called')}
                    onBlur={() => console.log('onBlur called')}
                    onChange={this.searchTextChange}null
                />
                <FocusZone>
                    <TextField label={'Filter by ' + this.state.searchText} onChange={this.filter} />
                    <List items={this.state.searchResults} onRenderCell={this.renderCell} />
                </FocusZone>
            </div>
        )
    }
}

export default SearchBar