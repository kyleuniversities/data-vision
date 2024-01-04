import React from 'react';
import './index.css';
import { SiteHeader } from './SiteHeader';

export class SitePage extends React.Component {
  render() {
    return (
      <div className="sitePage">
        <SiteHeader />
        {this.props.children}
      </div>
    );
  }
}
