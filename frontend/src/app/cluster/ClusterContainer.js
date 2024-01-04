import React, { useState } from 'react';
import { Canvas } from './Canvas';
import './index.css';
import {
  drawCluster,
  drawGraphBackground,
  drawPoint,
} from '../helper/GraphHelper';
import { request } from '../request';

/**
 * Container for viewing cluster graphs
 */
export const ClusterContainer = () => {
  // Set up form data
  const [commands, setCommands] = useState([]);
  const [numberOfPoints, setNumberOfPoints] = useState('16');
  const [numberOfCentroids, setNumberOfCentroids] = useState('8');

  // Set up draw function
  const draw = makeDrawFunctionFromCommands(commands);

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
              setCommands={setCommands}
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
            this.props.numberOfCentroids,
            this.props.setCommands
          )
        }
      >
        Submit
      </button>
    );
  }
}

// Run the generate request
function runGenerateRequest(numberOfPoints, numberOfCentroids, setCommands) {
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
  const requestUrl = `/k-means/generate-test`;

  // Run the request
  return request(requestUrl, options).then((commands) => {
    alert('COMMANDS: ' + JSON.stringify(commands));
    setCommands(commands);
  });
}

/**
 * Creates a new draw function from commands
 */
function makeDrawFunctionFromCommands(commands) {
  return (context, time) => {
    drawGraphBackground(context);
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      switch (command.type) {
        case 'point':
          drawPoint(context, command);
          break;
        case 'cluster':
          drawCluster(context, command);
          break;
        default:
          alert(`ERROR: Bad command: idx=${i} val=${JSON.stringify(command)}`);
          return;
      }
    }
  };
}
