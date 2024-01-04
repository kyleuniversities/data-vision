import React from 'react';
import { SitePage } from '../SitePage';
import { ClusterContainer } from '../cluster/ClusterContainer';

export class HomePage extends React.Component {
  render() {
    return (
      <div>
        <SitePage>
          <ClusterContainer />
        </SitePage>
      </div>
    );
  }
}
