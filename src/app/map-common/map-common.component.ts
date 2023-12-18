// import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
// import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
// import * as mapboxgl from 'mapbox-gl';
// import * as THREE from 'three';
// import { FeatureCollection } from 'geojson';

// // import { Position } from 'mapbox-gl';


// @Component({
//   selector: 'app-map-common',
//   templateUrl: './map-common.component.html',
//   styleUrls: ['./map-common.component.css']
// })
// export class MapCommonComponent implements OnInit, OnDestroy {
//   private map!: mapboxgl.Map;
//   private renderer!: THREE.WebGLRenderer;
//   private scene!: THREE.Scene;
//   private camera!: THREE.PerspectiveCamera;
//   private polygons: THREE.Mesh[] = [];
//   draw: any;
//   selectedFeatures: any;

//   constructor(private el: ElementRef) { }

//   ngOnInit(): void {
//     (mapboxgl as any).accessToken = 'pk.eyJ1IjoibWFyb29uZWRpb25lIiwiYSI6ImNqdmp0MzB1azBpcDAzem1naHZwMjNndGIifQ.65nvvRg9QeFUV2c6b9W4Vw';

//     this.map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/streets-v12',
//       center: [-74.5, 40],
//       zoom: 9,
//     });

//     // Ваши настройки для Mapbox Draw
//     this.map.once('load', () => {
//       const draw = new MapboxDraw({
//       displayControlsDefault: false,
//       controls: {
//         polygon: true,
//         trash: true,
//       },
//     })


//     this.map.addControl(draw, 'top-left');
//     this.map.on('draw.create', this.handleDrawCreate.bind(this));
//     this.map.on('draw.selectionchange', this.handleSelectionChange.bind(this));
//     this.draw = draw;

//   });
  

//     this.renderer = new THREE.WebGLRenderer();
//     this.renderer.setSize(window.innerWidth, window.innerHeight);
//     this.el.nativeElement.appendChild(this.renderer.domElement);

//     this.scene = new THREE.Scene();

//     this.camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     this.camera.position.z = 5;

//     const animate = () => {
//       requestAnimationFrame(animate);
//       this.renderer.render(this.scene, this.camera);
//     };

//     animate();
//   }

//   activateDrawMode(): void {
//     if (this.draw) {
//       this.draw.changeMode('draw_polygon');
//     }
//   }

//   handleSelectionChange(event: any): void {
//     this.selectedFeatures = event.features || [];
//   }

//   deleteSelected(): void {
//     // Удаление выбранных фигур
//     const selectedFeatures = this.selectedFeatures;
//     if (selectedFeatures && selectedFeatures.length > 0) {
//       selectedFeatures.forEach((feature: { id: { toString: () => any; }; }) => {
//         if (feature.id) {
//           this.draw.delete([feature.id.toString()]);
//         }
//       });
//     }
//   }
  

//   ngOnDestroy(): void {
//     this.map.off('draw.create', this.handleDrawCreate.bind(this));
//     // Дополнительные действия по удалению контролов и т. д.
//   }

//   private handleDrawCreate(event: { features: any[]; }): void {
//     const polygon = event.features[0];
//     const coordinates = polygon.geometry.coordinates;
//     console.log(coordinates);

//     // Добавляем полигон на карту
//     this.addPolygonToMap(polygon);
//   }

//   // Добавление полигона на карту
//   addPolygonToMap(event: any): void {
//     const sourceId = 'my-polygon-source';
//     const layerId = 'my-polygon-layer';

//     const _polygon = event.features && event.features[0];

//     if (_polygon) {
//       const coordinates = _polygon.geometry.coordinates;
//       console.log(coordinates);

//       // Добавляем полигон на карту
//       this.addPolygonToMapInternal(_polygon);
//     }

  
//   // Проверяем, есть ли уже источник на карте
//   if (!this.map.getSource(sourceId)) {
//     // Если нет, добавляем источник
//     this.map.addSource(sourceId, {
//       type: 'geojson',
//       data: {
//         type: 'FeatureCollection',
//         features: [_polygon.toJSON()],
//       },
//     });

//     console.log('Источник добавлен на карту');
//   }

//   // Проверяем, есть ли уже слой на карте
//   if (!this.map.getLayer(layerId)) {
//     // Если нет, добавляем слой
//     this.map.addLayer({
//       id: layerId,
//       type: 'fill',
//       source: sourceId,
//       paint: {
//         'fill-color': '#888888',
//         'fill-opacity': 0.8,
//         'fill-outline-color': '#ffffff',
//       },
//     });

//     console.log('Слой добавлен на карту');
//   }
//     const featureCollection: FeatureCollection = {
//       type: 'FeatureCollection',
//       features: [_polygon],
//     };

//     const source: mapboxgl.GeoJSONSource = this.map.getSource('my-polygon-source') as mapboxgl.GeoJSONSource;

//     if (source) {
//     source.setData(featureCollection);
//   } else {
//     this.map.addSource('my-polygon-source', {
//       type: 'geojson',
//       data: featureCollection,
//     });
    
  
//     this.polygons.forEach((polygon, index) => {
//       // const coordinates = this.mapboxCoordinatesFromThreeJS(polygon.position);
//       // const coordinates: mapboxgl.Position[] = [[longitude, latitude]];
//       const longitude = -74.5; // Пример для Нью-Йорка
//       const latitude = 40.7;
//       const coordinates: number[][] = [[longitude, latitude]];
//       const feature: mapboxgl.MapboxGeoJSONFeature = {
//         type: 'Feature',
//         geometry: {
//           type: 'Polygon',
//           coordinates: [coordinates],
//         },
//         properties: {},
//         id: index.toString(),
//       } as mapboxgl.MapboxGeoJSONFeature;      
  
//       featureCollection.features.push(feature);
//     });
  
//     const source: mapboxgl.GeoJSONSource = this.map.getSource('my-polygon-source') as mapboxgl.GeoJSONSource
  
//     if (source) {
//       // const jsonString = JSON.stringify(featureCollection);
//       source.setData(featureCollection);
//     } else {
//       this.map.addSource('my-polygon-source', {
//         type: 'geojson',
//         data: featureCollection,
//       });
  
//       this.map.addLayer({
//         id: 'my-polygon-layer',
//         source: 'my-polygon-source',
//         type: 'fill',
//         paint: {
//           'fill-color': '#FF0000',
//           'fill-opacity': 0.9,
//         },
//       });
//     }
//   }
// }
// }

import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as mapboxgl from 'mapbox-gl';
import * as THREE from 'three';
import { FeatureCollection } from 'geojson';

@Component({
  selector: 'app-map-common',
  templateUrl: './map-common.component.html',
  styleUrls: ['./map-common.component.css']
})
export class MapCommonComponent implements OnInit, OnDestroy {
  private map!: mapboxgl.Map;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private polygons: THREE.Mesh[] = [];
  public draw: any;
  handleSelectionChange: any;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibWFyb29uZWRpb25lIiwiYSI6ImNqdmp0MzB1azBpcDAzem1naHZwMjNndGIifQ.65nvvRg9QeFUV2c6b9W4Vw';
  
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });
  
    // Ваши настройки для Mapbox Draw
    this.map.once('load', () => {
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });
  
      this.map.addControl(draw, 'top-left');
      this.map.on('draw.create', this.handleDrawCreate.bind(this));
      this.map.on('draw.selectionchange', this.handleSelectionChange.bind(this));
      this.draw = draw;
    });

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  activateDrawMode(): void {
    this.draw.changeMode('draw_polygon');
  }

  handleDrawCreate(event: any): void {
    const polygon = event.features[0];
    const coordinates = polygon.geometry.coordinates;
    console.log(coordinates);

    // Добавляем полигон на карту
    this.addPolygonToMap();
  }

  addPolygonToMap(): void {
    const sourceId = 'my-polygon-source';
    const layerId = 'my-polygon-layer';

    if (this.draw) {
      const polygons = this.draw.getAll();
      polygons.features.forEach((polygon: any) => {
        this.handleDrawCreate({ features: [polygon] });
      });
    }
  
    // Проверяем, есть ли уже источник на карте
    if (!this.map.getSource(sourceId)) {
      // Если нет, добавляем источник
      this.map.addSource(sourceId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });
  
      console.log('Источник добавлен на карту');
    }
  
    // Проверяем, есть ли уже слой на карте
    if (!this.map.getLayer(layerId)) {
      // Если нет, добавляем слой
      this.map.addLayer({
        id: layerId,
        type: 'fill',
        source: sourceId,
        paint: {
          'fill-color': '#888888',
          'fill-opacity': 0.8,
          'fill-outline-color': '#ffffff', // цвет обводки
          'fill-pattern': 'pattern-name', // шаблон заливки (если нужен)
        },
      });
  
      console.log('Слой добавлен на карту');
    }
  
    const featureCollection: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    };
  
    const source: mapboxgl.GeoJSONSource = this.map.getSource('my-polygon-source') as mapboxgl.GeoJSONSource;
  
    if (source) {
      source.setData(featureCollection);
    } else {
      this.map.addSource('my-polygon-source', {
        type: 'geojson',
        data: featureCollection,
      });
  
      this.map.addLayer({
        id: 'my-polygon-layer',
        source: 'my-polygon-source',
        type: 'fill',
        paint: {
          'fill-color': '#FF0000',
          'fill-opacity': 0.9,
        },
      });
    }
  }
  

  ngOnDestroy(): void {
    this.map.off('draw.create', this.handleDrawCreate);
  }
}
