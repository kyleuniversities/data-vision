import React, { useState } from 'react';
import { Canvas } from './Canvas';
import './index.css';
import { drawGraphBackground } from '../helper/GraphHelper';
import { request } from '../request';

/**
 * Container for viewing cluster graphs
 */
export const ClusterContainer = () => {
  // Set up form data
  const [numberOfPoints, setNumberOfPoints] = useState('100');
  const [numberOfCentroids, setNumberOfCentroids] = useState('5');

  // Sample animation
  const draw = (context, time) => {
    drawGraphBackground(context);
  };

  return (
    <div className="clusterContainer">
      <h1>Cluster Graph</h1>
      <div className="clusterContentContainer">
        <div className="clusterGenerateContainer">
          <h2>Generate:</h2>
          <form>
            <FormInput
              name="points"
              label="Number of Points"
              value={numberOfPoints}
              setValue={setNumberOfPoints}
            />
            <FormInput
              name="centroids"
              label="Number of Centroids"
              value={numberOfCentroids}
              setValue={setNumberOfCentroids}
            />
            <ClusterContainerSubmitButton
              numberOfPoints={numberOfPoints}
              numberOfCentroids={numberOfCentroids}
            />
          </form>
        </div>
        <div className="clusterGraphContainer">
          <h2>Graph:</h2>
          <Canvas width={400} height={400} draw={draw} />
        </div>
      </div>
    </div>
  );
};

// Component for input
class FormInput extends React.Component {
  render() {
    return (
      <div className="formInput">
        <b>
          <label for={this.props.name}>{this.props.label}</label>
        </b>
        <br />
        <input
          name={this.props.name}
          value={this.props.value}
          onChange={(e) => this.props.setValue(e.target.value)}
        />
        <br />
      </div>
    );
  }
}

// Button for sending the generate request
class ClusterContainerSubmitButton extends React.Component {
  render() {
    return (
      <button
        type="button"
        onClick={() =>
          runGenerateRequest(
            this.props.numberOfPoints,
            this.props.setNumberOfCentroids
          )
        }
      >
        Submit
      </button>
    );
  }
}

// Run the generate request
function runGenerateRequest(numberOfPoints, numberOfCentroids) {
  // Set up method
  const method = 'POST';

  // Set up post body
  const generate = {
    numberOfPoints,
    numberOfCentroids,
  };

  // Set up request parameters
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(generate),
  };

  // Set up request url
  const requestUrl = `/k-means/test`;

  // Run the request
  return request(requestUrl, options).then((data) => {
    alert('DATA: ' + JSON.stringify(data));
  });
}
