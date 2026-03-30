import React from 'react'

import CircularProgress from '@mui/material/CircularProgress';

export default class Waiting extends React.Component {
  render() {
    return (<div style={{textAlign: 'center'}}><CircularProgress /></div>);
  }
};
