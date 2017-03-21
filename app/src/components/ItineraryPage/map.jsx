import React, { Component } from 'react';

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { 
        lat: 33.9759, 
        lng: -118.3907 
      },
      zoom: 13,
    }
  }

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    window.map = new google.maps.Map(this.refs.mapCanvas, {
      zoom: this.state.zoom,
      center: this.mapCenter()
    });
    window.markerBounds = new google.maps.LatLngBounds();
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.state.center.lat,
      this.state.center.lng
    )
  }

  render() {
    return (
      <div className="google-map" ref="mapCanvas"></div>
    );
  }
}

export default GoogleMap