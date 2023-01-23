/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYXZpdnMxNSIsImEiOiJjbDc3NGNiY2swYzR6M3ZvMWpicGFhMnpzIn0.BcVgq5DzHHpyZrxU8pSljQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/avivs15/cl774sfao002n15qh9mo8d15z',
    scrollZoom: false
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
