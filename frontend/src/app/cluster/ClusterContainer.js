import React, { useState } from 'react';
import { Canvas } from './Canvas';
import './index.css';
import {
  drawCluster,
  drawGraphBackground,
  drawPoint,
} from '../helper/GraphHelper';
import { request } from '../request';
import { debugAlert } from '../debugAlert';
import { Color } from '../color';

/**
 * Container for viewing cluster graphs
 */
export const ClusterContainer = () => {
  // Set up user input form data
  const [numberOfPoints, setNumberOfPoints] = useState('100');
  const [numberOfGeneratingCentroids, setNumberOfGeneratngCentroids] = useState(
    '5'
  );
  const [numberOfDetectingCentroids, setNumberOfDetectingCentroids] = useState(
    '5'
  );

  // Set up output form data
  const [generatedCommands, setGeneratedCommands] = useState([]);
  const [detectedCommands, setDetectedCommands] = useState([]);

  // Set up draw function
  const drawGenerated = makeDrawFunctionFromCommands(generatedCommands);
  const drawDetected = makeDrawFunctionFromCommands(detectedCommands);

  // Return component
  return (
    <div id="clusterContainer">
      <h1>K-Means Cluster Graph</h1>
      <div className="clusterContentContainer">
        <div className="clusterGenerateContainer">
          <h2>Generate:</h2>
          <form>
            <RangedNumberFormInput
              name="points"
              label="Number of Points"
              value={numberOfPoints}
              setValue={setNumberOfPoints}
              min={1}
              max={1000}
            />
            <RangedNumberFormInput
              name="generating-centroids"
              label="Number of Generating Centroids"
              value={numberOfGeneratingCentroids}
              setValue={setNumberOfGeneratngCentroids}
              min={1}
              max={500}
            />
            <RangedNumberFormInput
              name="detecting-centroids"
              label="Number of Detecting Centroids"
              value={numberOfDetectingCentroids}
              setValue={setNumberOfDetectingCentroids}
              min={1}
              max={500}
            />
            <ClusterContainerSubmitButton
              numberOfPoints={numberOfPoints}
              numberOfGeneratingCentroids={numberOfGeneratingCentroids}
              numberOfDetectingCentroids={numberOfDetectingCentroids}
              setGeneratedCommands={setGeneratedCommands}
              setDetectedCommands={setDetectedCommands}
            />
          </form>
        </div>
        <ClusterGraphContainer title="Generated Graph" draw={drawGenerated} />
        <ClusterGraphContainer title="Detected Graph" draw={drawDetected} />
      </div>
    </div>
  );
};

// Cluster Graph Container
class ClusterGraphContainer extends React.Component {
  render() {
    return (
      <div className="clusterGraphContainer">
        <h2>{this.props.title}:</h2>
        <Canvas width={400} height={400} draw={this.props.draw} />
      </div>
    );
  }
}

// Component for input while checking for a range
class RangedNumberFormInput extends React.Component {
  render() {
    // Validates input to ensure it fits within a given range
    const handleChangeValue = (newValue) => {
      // Passes if the value is empty
      if (newValue.length === 0) {
        this.props.setValue(newValue);
        return;
      }

      // Check if is an integer
      const zeroCode = '0'.charCodeAt(0);
      const nineCode = '9'.charCodeAt(0);
      for (let i = 0; i < newValue.length; i++) {
        const code = newValue.charCodeAt(i);
        if (code < zeroCode || code > nineCode) {
          return;
        }
      }

      // Parse if it is integer
      const intValue = parseInt(newValue);

      // Check if it is within range
      if (this.props.min <= intValue && intValue <= this.props.max) {
        // Update the field value if all checks have passed
        this.props.setValue(newValue);
      }
    };

    // Return component
    return (
      <FormInput
        name={this.props.name}
        label={this.props.label}
        value={this.props.value}
        setValue={handleChangeValue}
      />
    );
  }
}

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
          runGenerateDetectRequest(
            this.props.numberOfPoints,
            this.props.numberOfGeneratingCentroids,
            this.props.numberOfDetectingCentroids,
            this.props.setGeneratedCommands,
            this.props.setDetectedCommands
          )
        }
      >
        Submit
      </button>
    );
  }
}

// Run the generate detect request
async function runGenerateDetectRequest(
  numberOfPoints,
  numberOfGeneratingCentroids,
  numberOfDetectingCentroids,
  setGeneratedCommands,
  setDetectedCommands
) {
  // Stops the action if the text is invalid
  if (
    numberOfPoints.length === 0 ||
    numberOfGeneratingCentroids.length === 0 ||
    numberOfDetectingCentroids.length === 0
  ) {
    alert('There must be no empty strings');
    return;
  }

  // Stops the action if the number of points is less than the number
  // generating centroids
  if (parseInt(numberOfPoints) < parseInt(numberOfGeneratingCentroids)) {
    alert(
      'The number of points must be greater than or equal' +
        ' to the number of generated centroids.'
    );
    return;
  }

  // Generate clusters
  const generatedClusters = await runGenerateRequest(
    numberOfPoints,
    numberOfGeneratingCentroids
  );

  debugAlert('GEN: ' + JSON.stringify(generatedClusters));

  // Detect clusters
  const detectedClusters = await runDetectRequest(
    generatedClusters,
    numberOfDetectingCentroids
  );

  // Set Generated Commands
  runGetCommandsRequest(
    setGeneratedCommands,
    generatedClusters,
    new Color(0, 128, 255)
  );

  // Set Detected Commands
  runGetCommandsRequest(
    setDetectedCommands,
    detectedClusters,
    new Color(128, 0, 255)
  );
}

// Run the generate request
async function runGenerateRequest(numberOfPoints, numberOfGeneratingCentroids) {
  // Set up method
  const method = 'GET';

  // Set up request parameters
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Set up request url
  const requestUrl =
    `/k-means/generate?` +
    `numberOfPoints=${numberOfPoints}&` +
    `numberOfGeneratingCentroids=${numberOfGeneratingCentroids}`;

  // Run the request
  return request(requestUrl, options);
}

// Run the generate request
async function runDetectRequest(clusters, numberOfDetectingCentroids) {
  // Set up method
  const method = 'POST';

  // Set up post body
  const detect = {
    clusters,
    numberOfDetectingCentroids,
  };

  // Set up request parameters
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(detect),
  };

  // Set up request url
  const requestUrl = `/k-means/detect`;

  // Run the request
  return request(requestUrl, options);
}

// Run get commands request
async function runGetCommandsRequest(setCommands, clusters, color) {
  // Set up method
  const method = 'POST';

  // Set up post body
  const body = {
    clusters,
  };

  // Set up request parameters
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(body),
  };

  // Set up request url
  const requestUrl = `/k-means/commands`;

  // Run the request
  return request(requestUrl, options).then((commands) => {
    debugAlert('COMMANDS: ' + JSON.stringify(commands));
    for (let i = 0; i < commands.length; i++) {
      commands[i].color = color;
    }
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
