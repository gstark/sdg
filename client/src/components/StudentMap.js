import React, { Component } from 'react'
import MapGL, { Marker, NavigationControl, Popup } from 'react-map-gl'
import pin from '../images/pin.png'

class StudentMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      popupInfo: null,

      viewport: {
        latitude: 27.7700989,
        longitude: -82.6364093,
        zoom: 12.5,
        bearing: 0,
        pitch: 0
      }
    }
  }

  _updateViewport = viewport => {
    console.log(viewport)
    this.setState({ viewport })
  }

  navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
  }

  renderPopup = () => {
    // Get the popupinfo from the state
    const { popupInfo } = this.state

    // If we don't have any, return and don't render anything
    if (!popupInfo) {
      return
    }

    return (
      <Popup
        tipSize={5}
        anchor="right"
        offsetLeft={100}
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        closeOnClick={false}
        onClose={() => {
          this.setState({ popupInfo: null })
        }}
      >
        <div className="map-popup">
          <p>{popupInfo.name}</p>
          <p>{popupInfo.address}</p>
        </div>
      </Popup>
    )
  }

  render() {
    // This line is a shortcut for: const viewport = this.state.viewport
    const { viewport } = this.state

    return (
      <div className="student-map">
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          // mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken="pk.eyJ1IjoiZ2F2aW5zdGFyayIsImEiOiIxZjVmODFhYWQ2NjIyZGY1MTQ5MzM3ZTE2MWNkMDkxMiJ9.HG1IbUfea4FfcJ0WrY7Pqg"
          onViewportChange={this._updateViewport}
        >
          {this.renderPopup()}
          {this.props.students.map(student => (
            <Marker
              key={student.id}
              latitude={student.latitude}
              longitude={student.longitude}
              offsetTop={-64}
              offsetLeft={-32}
            >
              <img
                width="64"
                height="64"
                src={pin}
                onClick={() => {
                  this.setState({ popupInfo: student })
                }}
              />
            </Marker>
          ))}
          <div className="nav" style={this.navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
          </div>
        </MapGL>
      </div>
    )
  }
}

export default StudentMap
