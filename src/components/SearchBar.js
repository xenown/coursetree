import React, { Component } from 'react'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import data from '../CS_res.json';

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

  classNames = mergeStyleSets({
    itemCell: [
      getFocusStyle(theme, { inset: -1 }),
      {
        zIndex: 2,
        background: 'white',
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

  filter = (e, text) => {
    console.log(text);
    this.setState({
      searchText: text,
      searchResults: text ? (text === "" ? [] : data.filter(item => (item.code + item.name).toLowerCase().indexOf(text.toLowerCase()) >= 0)) : []
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
      <div className={this.classNames.itemCell} onMouseDown={this.onClickCell} data-is-focusable={true}>
        {/* <Image className={classNames.itemImage} src={item.thumbnail} width={50} height={50} imageFit={ImageFit.cover} /> */}
        <div className={this.classNames.itemContent}>
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
          <SearchBox
            placeholder="Search for Courses!"
            onFocus={() => console.log('onFocus called')}
            onBlur={this.unFocus}
            onChange={this.filter}
          />
          <List
            items={this.state.searchResults}
            onRenderCell={this.renderCell}
            className={this.classNames.listGridExample} />
        </FocusZone>
      </div>
    )
  }
}

export default SearchBar