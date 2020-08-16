import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import theme from '../styles/theme';
import { Grid, Tooltip, Button, withStyles, Theme } from '@material-ui/core';
import TemperatureDigital from '../components/TemperatureDigital';
import { SourceDaily } from '../domain/source-json';

interface HomePageProps {
  dataUrl: URL
}

type HomePageState = {
  isLoaded: boolean,
  data?: SourceDaily,
  time: Date,
  error: any,
}


const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

class HomePage extends Component<HomePageProps, HomePageState> {

  // Before the component mounts, we initialise our state
  UNSAFE_componentWillMount() {
    this.tick();
  }

  componentDidMount() {
    // need to make the initial call to getData() to populate
    // data right away
    this.getData();

    // Now we need to make it run at a specified interval
    setInterval(() => this.tick(), 1000); // runs every 5 seconds.
  }

  getData = () => {
    // do something to fetch data from a remote API.
    fetch(this.props.dataUrl.toString())
      .then(response => response.json())
      .then(
        // handle the result
        (result) => {
          console.info(result);
          this.setState({
            isLoaded: true,
            data: result
          });
        },

        // Handle error
        (error) => {
          console.error(error);
          this.setState({
            isLoaded: true,
            error
          })
        },
      )
  }

  // The tick function sets the current state. TypeScript will let us know
  // which ones we are allowed to set.
  tick() {
    this.setState({
      time: new Date()
    });
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
          <Container maxWidth="sm">
            <Box my={4}>
              <Typography variant="h4" component="h1" gutterBottom>Weather Overview</Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                {data?.location}
              </Typography>
              <Typography variant="h6" component="p" gutterBottom>
                Station Time: {data?.time}
              </Typography>
              <HtmlTooltip title={
                <React.Fragment>
                  <pre>{this.stateText()}</pre>
                </React.Fragment>
              }><Button>JSON</Button></HtmlTooltip>

          Timer: {this.state.time.toISOString()}
            </Box>
            <Grid container spacing={3}>
              {data?.stats.map((stat) => {
                return (
                  <Grid item xs={3}>
                    <TemperatureDigital value={stat.currentValue} title={stat.label} unit={stat.unit} />
                  </Grid>)
              })}
            </Grid>
          </Container>
        </ThemeProvider>
      );
    }
  }
}

export default HomePage;
