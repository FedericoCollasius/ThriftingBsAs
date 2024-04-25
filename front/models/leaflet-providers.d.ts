import 'leaflet';
import 'leaflet-providers';

declare module 'leaflet' {
    namespace tileLayer {
        function provider(name: string, options?: any): TileLayer;
    }
}