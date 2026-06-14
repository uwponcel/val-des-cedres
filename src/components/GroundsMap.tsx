import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { property } from '../data/property';

/** Dark, gently tilted MapLibre map centered on the property. WebGL-based. */
export default function GroundsMap() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const { lat, lng } = property.coords;

    const map = new maplibregl.Map({
      container: container.current,
      style: {
        version: 8,
        sources: {
          carto: {
            type: 'raster',
            tiles: [
              'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
              'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
              'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap · © CARTO',
          },
        },
        layers: [{ id: 'carto', type: 'raster', source: 'carto' }],
      },
      center: [lng, lat],
      zoom: 12.6,
      pitch: 45,
      bearing: -18,
      cooperativeGestures: true,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

    const el = document.createElement('div');
    el.className = 'vc-pin';
    new maplibregl.Marker({ element: el }).setLngLat([lng, lat]).addTo(map);

    return () => map.remove();
  }, []);

  return <div ref={container} className="h-full w-full" />;
}
