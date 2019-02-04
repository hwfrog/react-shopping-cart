import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '60px auto',
    position: "fixed",
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class ChipsArray extends React.Component {
  state = {
    chipData: [
      { key: 0, label: 'S' },
      { key: 1, label: 'XS' },
      { key: 2, label: 'M' },
      { key: 3, label: 'ML' },
      { key: 4, label: 'L' },
      { key: 5, label: 'XL' },
      { key: 6, label: 'XXL' }
    ],
  };

  handleClick = id => () => {
    this.props.onClickChip(id);
  }

  render() {
    const { classes } = this.props;
    var color = 'default';

    return (
      <Paper className={classes.root}>
        {this.state.chipData.map(data => {
          if (this.props.chipData[data.label]) {
            color = 'primary';
          }
          else{
            color = 'default';
          }

          return (
            <Chip
              key={data.key}
              color={color}
              label={data.label}
              onClick={this.handleClick(data.label)}
              className={classes.chip}
            />
          );
        })}
      </Paper>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);