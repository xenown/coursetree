import React, {Component} from 'react'

class SearchBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            input: "",
        }
    }
    render () {
        return (
            <div>
                CourseTree
                <div class="md-form mt-0">
                <input class="form-control" type="text" placeholder="Enter a Course name" aria-label="Search"/>
                </div>
            </div>  
        )      
    }   
}

export default SearchBar