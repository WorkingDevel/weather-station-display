import React, { Component } from 'react';

class HomePage extends Component {

    componentDidMount() {
        // need to make the initial call to getData() to populate
        // data right away
        this.getData();

        // Now we need to make it run at a specified interval
        setInterval(this.getData, 5000); // runs every 5 seconds.
    }

    getData = () => {
        // do something to fetch data from a remote API.
        console.log("now");
    }

    formatTime(secs: number) {
        let hours   = Math.floor(secs / 3600);
        let minutes = Math.floor(secs / 60) % 60;
        let seconds = secs % 60;
        return [hours, minutes, seconds]
            .map(v => ('' + v).padStart(2, '0'))
            .filter((v,i) => v !== '00' || i > 0)
            .join(':');
      }

    render() {
        return (
            <div>
                Our fancy dashboard lives here.
                Timer: {this.formatTime(Date.now())}
            </div>
        );
    }
}

export default HomePage;
