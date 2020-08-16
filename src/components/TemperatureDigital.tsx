import React from 'react';
import { Theme, WithStyles, withStyles, createStyles, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';

// Theme-dependent styles
const styles = (theme: Theme) => createStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  root: {
    minWidth: 75,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface WidgetProps extends WithStyles<typeof styles> {
  title: string,
  value: string,
  unit: string
}

class TemperatureDigital extends React.Component<WidgetProps> {

  static defaultProps = {
    title: 'Temperature',
    unit: '°C'
  }

  render() {
    const { classes, value, unit, title } = this.props;

    return (
      <Card className={classes.root} elevation={5}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="h2">
            {value}{unit}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Details</Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(TemperatureDigital);
