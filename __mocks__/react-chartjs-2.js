const React = require('react');

const Bar = (props) => React.createElement('canvas', { 'data-testid': 'bar-chart' });
const Line = (props) => React.createElement('canvas', { 'data-testid': 'line-chart' });
const Doughnut = (props) => React.createElement('canvas', { 'data-testid': 'doughnut-chart' });
const Pie = (props) => React.createElement('canvas', { 'data-testid': 'pie-chart' });

module.exports = { Bar, Line, Doughnut, Pie };
