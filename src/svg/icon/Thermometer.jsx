import React from 'react'

export default class extends React.Component {
  render() {
    return (
      <svg
        style={this.props.style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1218 4118"
        height={(this.props.height || (this.props.width || 100))}
        width={(this.props.width || (this.props.height || 100))}>
       <g>
        <path d="m913 2981c182 105 304 302 304 527 0 336-273 609-609 609s-609-273-609-609c0-225 122-422 304-527v-2677c0-167 137-304 304-304s304 137 304 304v556h209v28 11 39h-209v492h209v28 11 39h-209v492h209v28 11 39h-209v492h209v28 11 39h-209v336zm-187 113v-1257h-236v1257c-181 51-313 217-313 414 0 238 193 431 431 431s431-193 431-431c0-197-132-363-313-414zm77-50v-2740c0-107-88-195-195-195s-195 88-195 195v2740l-55 32c-154 89-250 254-250 433 0 276 224 499 499 499 276 0 499-224 499-499 0-179-95-343-250-433l-55-32z"/>
       </g>
      </svg>
    );
  }
}
