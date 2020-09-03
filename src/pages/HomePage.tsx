import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import theme from '../styles/theme';
import { Grid, Tooltip, Button, withStyles, Theme, CssBaseline } from '@material-ui/core';
import TemperatureDigital from '../components/TemperatureDigital';
import { ConnectedProps, connect } from 'react-redux';
import { timeSlice } from '../store/time/slice';
import { RootState } from '../store';

interface HomePageProps extends PropsFromRedux {
  dataUrl: URL
}

const mapState = (state: RootState) => ({
  stationTime: state.time.stationTime,
  localTime: state.time.displayTime,
  daily: state.stationData.daily
})

const mapDispatch = {
  setTime: (time: Date) => timeSlice.actions.setLocalTime(time.toISOString())
}

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#555555',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

class HomePage extends Component<HomePageProps> {

  // constructor(props: HomePageProps) {
  //   super(props);
  // }

  stateText() {
    if (this.props.daily === null) {
      return JSON.stringify(this.props.daily!!.data, null, 2)
    } else {
      return "no"
    }
  }

  render() {

    if (this.props.daily === null) {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="sm">
            <Box my={4}>
              <Typography variant="h4" component="h1" gutterBottom>Weather Overview</Typography>
            </Box>
          </Container>
        </ThemeProvider>
      );
    } else {
      const data = this.props.daily.data!!
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="md">
            <Box my={4}>
              <Typography variant="h4" component="h1" gutterBottom>Weather Overview</Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                {data?.location}
              </Typography>
              <Typography variant="h6" component="p" gutterBottom>
                Station Time: {data?.time}, Last Fetch Time: {this.props.daily.lastFetched}
              </Typography>
              <HtmlTooltip title={
                <React.Fragment>
                  <pre>{this.stateText()}</pre>
                </React.Fragment>
              }><Button>JSON</Button></HtmlTooltip>

          Timer: {this.props.localTime}
            </Box>
            <Grid container spacing={1}>
              {data?.stats.map((stat) => {
                return (
                  <React.Fragment key={stat.name}>
                    <Grid item xs={2}>
                      <TemperatureDigital value={stat.currentValue} title={stat.label} unit={stat.unit} />
                    </Grid>
                  </React.Fragment>
                )
              })}
            </Grid>
          </Container>
        </ThemeProvider>
      );
    }
  }
}

export default connector(HomePage);
