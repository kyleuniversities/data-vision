import React, { useState } from 'react';
import { fullRequest } from '../request';

// Default host
const HOST = 'http://localhost:5000';

/**
 * Container for testing http requests
 */
export const RequestContainer = () => {
  const [fullUrl, setFullUrl] = useState(HOST);
  const [res, setRes] = useState('');

  return (
    <RequestContainerSegment>
      <form>
        <RequestContainerUrlTextField
          fullUrl={fullUrl}
          setFullUrl={setFullUrl}
        />
        <RequestContainerSubmitButton fullUrl={fullUrl} setRes={setRes} />
      </form>
      <RequestContainerResponseContainer res={res} />
    </RequestContainerSegment>
  );
};

// Wrapper for the Request Container
class RequestContainerSegment extends React.Component {
  render() {
    return (
      <div className="requestContainerSegment">
        <h1>Request Container</h1>
        {this.props.children}
      </div>
    );
  }
}

// Url text field for the Request Container
class RequestContainerUrlTextField extends React.Component {
  render() {
    return (
      <input
        className="requestContainerUrlTextField"
        label="Enter your request URL"
        value={this.props.fullUrl}
        onChange={(e) => this.props.setFullUrl(e.target.value)}
      />
    );
  }
}

// Button for sending the request
class RequestContainerSubmitButton extends React.Component {
  render() {
    return (
      <button
        type="button"
        onClick={() => runRequest(this.props.fullUrl, this.props.setRes)}
      >
        Submit
      </button>
    );
  }
}

// Container for the response data
class RequestContainerResponseContainer extends React.Component {
  render() {
    return (
      <div>
        <h3>Response: </h3>
        <textarea className="requestResponseContainer" value={this.props.res} />
      </div>
    );
  }
}

// Function for running request
function runRequest(fullUrl, setRes) {
  fullRequest(fullUrl).then((res) => {
    setRes(JSON.stringify(res));
  });
}
