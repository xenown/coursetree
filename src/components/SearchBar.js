import React, { Component } from 'react'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';

const theme = getTheme();
const { palette, semanticColors, fonts } = theme;

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
        },
        {
            "code": "CS 251 LAB,LEC,TST 0.50",
            "name": "Computer Organization and Design",
            "prereq": "Prereq: One of CS 136, 138, 146; Computer Science and BMath (Data Science) students only.",
            "note": "[Note: Students enrolled in CS/DHW should enrol in ECE 222. Enrolment is restricted; see Note 1 above. Lab is not scheduled and students are expected to find time in open hours to complete their work. Offered: F,W,S]",
            "course_id": "Course ID: 004382",
            "antireq": " Antireq: BME 292, ECE 222, ME 262, MTE 262, SYDE 192",
            "description": "Overview of computer organization and performance. Basics of digital logic design. Combinational and sequential elements. Data representation and manipulation. Basics of processor design. Pipelining. Memory hierarchies. Multiprocessors. "
        }
    ]

    classNames = mergeStyleSets({
        itemCell: [
            getFocusStyle(theme, { inset: -1 }),
            {
                minHeight: 54,
                padding: 10,
                boxSizing: 'border-box',
                borderBottom: `1px solid ${semanticColors.bodyDivider}`,
                display: 'flex',
                selectors: {
                    '&:hover': { background: palette.neutralLight }
                }
            }
        ],
        itemContent: {
            marginLeft: 10,
            overflow: 'hidden',
            flexGrow: 1
        },
        itemName: [
            fonts.xLarge,
            {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }
        ],
        itemDescription: {
            fontSize: fonts.medium.fontSize,
            color: palette.neutralTertiary,
        },
        itemNote: { 
            marginBottom: 10,
            color: palette.neutralTertiary,
            fontSize: fonts.medium.fontSize,
            flexShrink: 0
        }
    });

    searchTextChange = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }

    filter = (e, text) => {
        console.log(text);
        this.setState({
            searchText: text,
            searchResults: text ? (text === "" ? [] : this.courseData.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0)) : []
        });
    }


    renderCell = (item, index) => {
        return (
            <div className={this.classNames.itemCell} onClick={() => console.log("test")} data-is-focusable={true}>
                {/* <Image className={classNames.itemImage} src={item.thumbnail} width={50} height={50} imageFit={ImageFit.cover} /> */}
                <div id={index} className={this.classNames.itemContent}>
                    <div id={index} className={this.classNames.itemName}>{item.name}</div>
                    {item.note === "" ? <div /> : <div className={this.classNames.itemNote}>{item.note}</div>}
                    <div className={this.classNames.itemDescription}>{item.description}</div>
                </div>
                {/* <Icon className={classNames.chevron} iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} /> */}
            </div>
        );
    }

    render() {
        return (
            <div>
                <FocusZone>
                    <SearchBox
                        placeholder="Search for Courses!"
                        onSearch={newValue => console.log('value is ' + newValue)}
                        onFocus={() => console.log('onFocus called')}
                        onBlur={() => console.log('onBlur called')}
                        onChange={this.filter}
                    />
                    <List items={this.state.searchResults} onRenderCell={this.renderCell} />
                </FocusZone>
            </div>
        )
    }
}

export default SearchBar