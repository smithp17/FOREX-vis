import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as d3 from 'd3';
import './MapComponent.css';
import countriesGeoJSON from './data/countries.json';

function MapComponent() {
  const center = [35, 25]; // initial center coordinates

  const data = [1, 2, 3, 4, 5];
  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 20;
  const marginLeft = 20;

  const x = d3.scaleLinear().domain([0, data.length - 1]).range([marginLeft, width - marginRight]);
  const y = d3.scaleLinear().domain(d3.extent(data)).range([height - marginBottom, marginTop]);
  const line = d3.line().x((d, i) => x(i)).y(y);

  const geoJSONStyle = (feature) => {
    return {
      fillColor: 'green',
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.2,
    };
  };

  const maxBounds = [
    [-180, -180],
    [180, 347],
  ];

  const mouseDownFeature = (e) => {
    const layer = e.target;

    layer.setStyle({
      weight: 1.5,
      color: '047127',
      dashArray: '',
      fillOpacity: 0.8,
    });

    layer.bringToFront();
  };

  const mouseUpFeature = (e) => {
    const layer = e.target;

    layer.setStyle({
      weight: 1.5,
      color: '047127',
      dashArray: '',
      fillOpacity: 0.6,
    });

    layer.bringToFront();
  };

  const highlightFeature = (e) => {
    const layer = e.target;

    layer.setStyle({
      weight: 1.5,
      color: 'white',
      dashArray: '',
      fillOpacity: 0.4,
    });

    layer.bringToFront();
  };

  const resetHighlight = (e) => {
    const layer = e.target;

    layer.setStyle({
      weight: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.2,
    });
  };

  return (
    <MapContainer
      center={center}
      zoom={3}
      style={{ width: '100vw', height: '100vh' }}
      maxBounds={maxBounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        minZoom={3}
        maxZoom={4}
      />

      <GeoJSON
        data={countriesGeoJSON}
        style={geoJSONStyle}
        onEachFeature={(feature, layer) => {
          layer.on({
            mousedown: mouseDownFeature,
            mouseup: mouseUpFeature,
            mouseover: highlightFeature,
            mouseout: resetHighlight,
          });
        }}
      />

      <div className="overlay-div">
        <h1>Foreign Exchange Visualization</h1>
        <p>this is where we can generate graphs</p>

        <svg width={width} height={height}>
          <path fill="none" stroke="currentColor" strokeWidth={1.5} d={line(data)} />
          <g fill="white" stroke="currentColor" strokeWidth={1.5}>
            {data.map((d, i) => (
              <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
            ))}
          </g>
        </svg>
      </div>
    </MapContainer>
  );
}

export default MapComponent;
