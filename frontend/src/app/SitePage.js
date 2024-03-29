import React from 'react';
import './index.css';
import { SiteHeader } from './SiteHeader';

export class SitePage extends React.Component {
  render() {
    return (
      <div className="sitePage">
        <SiteHeader />
        <div className="sitePageContent">{this.props.children}</div>
      </div>
    );
  }
}
