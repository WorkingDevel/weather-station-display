import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import theme from '../styles/theme';
import { Grid, Tooltip, Button, withStyles, Theme, CssBaseline } from '@material-ui/core';
import TemperatureDigital from '../components/TemperatureDigital';
import { SourceDaily } from '../domain/source-json';
import { ConnectedProps, connect } from 'react-redux';
import { timeSlice } from '../store/time/slice';
import { RootState } from '../store';

interface HomePageProps extends PropsFromRedux {
  dataUrl: URL
}

type HomePageState = {
  isLoaded: boolean,
  lastFetched?: Date,
  data?: SourceDaily,
  error?: any,
}

const mapState = (state: RootState) => ({
  stationTime: state.time.stationTime,
  localTime: state.time.displayTime
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

class HomePage extends Component<HomePageProps, HomePageState> {

  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    // need to make the initial call to getData() to populate
    // data right away
    this.getData();

    // Now we need to make it run at a specified interval
    setInterval(() => this.getData(), 60000);
  }

  getData = () => {
    // do something to fetch data from a remote API.
    fetch(this.props.dataUrl.toString())
      .then(response => response.json())
      .then(
        // handle the result
        (result: SourceDaily) => {
          console.info(result);
          this.setState({
            isLoaded: true,
            lastFetched: new Date(),
            data: result
          });
        },

        // Handle error
        (error) => {
          console.error(error);
          this.setState({
            isLoaded: false,
            error
          })
        },
      )
  }

  stateText() {
    if (this.state.isLoaded) {
      return JSON.stringify(this.state.data!!, null, 2)
    } else {
      return "no"
    }
  }

  render() {

    if (this.state.data === null) {
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
      const data = this.state.data!!
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
                Station Time: {data?.time}, Last Fetch Time: {this.state.lastFetched?.toISOString()}
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
