import React from 'react';
import { SitePage } from '../SitePage';
import { RequestContainer } from '../RequestContainer';

export class RequestPage extends React.Component {
  render() {
    return (
      <div>
        <SitePage>
          <RequestContainer />
        </SitePage>
      </div>
    );
  }
}
