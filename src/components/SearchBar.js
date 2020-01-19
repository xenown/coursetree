import React, { Component } from 'react'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import data from '../CS_res.json';


const theme = getTheme();
const { palette, fonts } = theme;

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchText: "",
      searchResults: []
    }
  }

  classNames = mergeStyleSets({
    itemCell: [
      getFocusStyle(theme, { inset: -1 }),
      {
        backgroundColor: 'white',
        minHeight: 54,
        padding: 10,
        boxSizing: 'border-box',
        // borderTop: `1px solid ${semanticColors.bodyDivider}`,
        display: 'flex',
        selectors: {
          '&:hover': { background: palette.neutralLight }
        }
      }
    ],
    list: {
      marginTop: "1vh",
      backgroundColor: "white",
      overflow: 'auto',
      marginLeft: '15vh',
      marginRight: '1vh',
      width: '90%',
      zIndex: 1,
      maxHeight: '15vh',
      position: 'absolute',
    },
    itemContent: {
      marginLeft: 10,
      overflow: 'hidden',
      flexGrow: 1,
    },
    itemName: [
      fonts.large,
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
    },
    listGridExample: {
      overflow: 'hidden',
      fontSize: 0,
      position: 'relative',
      height: "100%"
    }
  });

  searchTextChange = (e) => {
    this.setState({
      searchText: e.target.value
    });
  }
  filter = (e) => {
    console.log(e.target.value);
    let t = e.target.value;
    this.setState({
      searchText: t,
      searchResults: t ? (t === "" ? [] : data.filter(item => (item.code + item.name).toLowerCase().indexOf(t.toLowerCase()) >= 0)) : []
    });
  }

  onClickCell = (e) => {
    console.log("click cell");
    this.props.updateTreeBaseCourse(e.target.id);
  }

  unFocus = (e) => {
    console.log("unFocus");
    this.setState({
      searchResults: []
    });
  }

  renderCell = (item, index) => {
    return (
      <div id={item.code} className={this.classNames.itemCell} onMouseDown={this.onClickCell} data-is-focusable={true}>
        {/* <Image className={classNames.itemImage} src={item.thumbnail} width={50} height={50} imageFit={ImageFit.cover} /> */}
        <div id={item.code} className={this.classNames.itemContent}>
          <div id={item.code} className={this.classNames.itemName}>{item.code + " " + item.name}</div>
          {/* {item.note === "" ? <div /> : <div className={this.classNames.itemNote}>{item.note}</div>} */}
          {/* <div className={this.classNames.itemDescription}>{item.description}</div> */}
        </div>
        {/* <Icon className={classNames.chevron} iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} /> */}
      </div>
    );
  }

  render() {
    return (
      <div>
        <FocusZone>
          <div className="SearchBox">
            <div className="Title">CourseTree</div>
            <SearchBox
              placeholder="Search for Courses!"
              onFocus={this.filter}
              onBlur={this.unFocus}
              onChange={this.filter}
            />
          </div>
          <div className="List">
            {/* <div className="Title" style={{ color: "transparent" }}>CourseTree</div> */}
            <List
              items={this.state.searchResults}
              onRenderCell={this.renderCell}
              className={this.classNames.list} />
          </div>
        </FocusZone>
      </div>
    )
  }
}

export default SearchBar