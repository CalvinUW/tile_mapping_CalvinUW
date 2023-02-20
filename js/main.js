mapboxgl.accessToken =
            'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

        const bounds = [
            [-122.53052090024306, 47.511499940080974],
            [-122.18372606453114, 47.759]
        ];

        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/light-v11', // style URL
            center: [-122.33628494223058, 47.63748628060085], // starting position [lng, lat]
            zoom: 10, // starting zoom
            maxBounds: bounds,
            maxZoom: 14
        });
        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right'); // Adds the compass widget from mapbox to the bottom right of the map

        map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function

            map.addSource('style_only_tiles', {
                'type': 'raster',
                'tiles': [
                    'assets/tiles_no_theme/{z}/{x}/{y}.png'
                ],
                'tileSize': 256,
                'attribution': 'Map tiles designed by Calvin Standaer</a>'
            });

            map.addSource('theme_only_tiles', {
                'type': 'raster',
                'tiles': [
                    'assets/just_theme/{z}/{x}/{y}.png'
                ],
                'tileSize': 256,
                'attribution': 'Map tiles designed by Calvin Standaert</a>'
            });

            map.addSource('style_theme_tiles', {
                'type': 'raster',
                'tiles': [
                    'assets/style_theme/{z}/{x}/{y}.png'
                ],
                'tileSize': 256,
                'attribution': 'Map tiles designed by Calvin Standaer</a>'
            });

            map.addSource('wood_style_tiles', {
                'type': 'raster',
                'tiles': [
                    'assets/wood_theme/{z}/{x}/{y}.png'
                ],
                'tileSize': 256,
                'attribution': 'Map tiles designed by Calvin Standaer</a>'
            });

            map.addLayer({
                'id': 'Custom Basemap',
                'type': 'raster',
                'layout': {
                    'visibility': 'none'
                },
                'source': 'style_only_tiles'
            });

            map.addLayer({
                'id': 'Public Art Installations',
                'type': 'raster',
                'layout': {
                    'visibility': 'none'
                },
                'source': 'theme_only_tiles'
            });

            map.addLayer({
                'id': 'Custom Basemap and Public Art Locations',
                'type': 'raster',
                'layout': {
                    'visibility': 'none'
                },
                'source': 'style_theme_tiles'
            });

            map.addLayer({
                'id': 'Environmental Protection Themed Basemap',
                'type': 'raster',
                'layout': {
                    'visibility': 'none'
                },
                'source': 'wood_style_tiles'
            });


        });

        map.on('idle', () => {
            // If these two layers were not added to the map, abort
            map.setMaxZoom(14);
            if (!map.getLayer('Custom Basemap') || !map.getLayer('Public Art Installations') || !map.getLayer(
                    'Custom Basemap and Public Art Locations') ||
                !map.getLayer('Environmental Protection Themed Basemap')) {
                return;
            }

            // Enumerate ids of the layers.
            const toggleableLayerIds = ['Custom Basemap', 'Public Art Installations',
                'Custom Basemap and Public Art Locations', 'Environmental Protection Themed Basemap'
            ];

            const titles = {'Custom Basemap':'Seattle, Washington', 'Public Art Installations':'Seattle Public Art Installations',
                'Custom Basemap and Public Art Locations':'Seattle Public Art Installations', 'Environmental Protection Themed Basemap':'Seattle, Washington'
            }; // A dictionary of titles to be used - accessed by inputting the current layer's id

            const subtitles = {'Custom Basemap':'With Custom Brown Basemap', 'Public Art Installations':'With Generic Mapbox Basemap',
                'Custom Basemap and Public Art Locations':'With Custom Brown Basemap', 'Environmental Protection Themed Basemap':'With Custom Environmental Themed Basemap'
            }; // A dictionary of subtitles to be used - accessed by inputting the current layer's id

            // Set up the corresponding toggle button for each layer.
            for (const id of toggleableLayerIds) {
                // Skip layers that already have a button set up.
                if (document.getElementById(id)) {
                    continue;
                }

                // Create a link.
                const link = document.createElement('a');
                link.id = id;
                link.href = '#';
                link.textContent = id;
                link.className = 'inactive';

                // Show or hide layer when the toggle is clicked.
                link.onclick = function (e) {
                    const clickedLayer = this.textContent;
                    // preventDefault() tells the user agent that if the event does not get explicitly handled, 
                    // its default action should not be taken as it normally would be.
                    e.preventDefault();
                    // The stopPropagation() method prevents further propagation of the current event in the capturing 
                    // and bubbling phases. It does not, however, prevent any default behaviors from occurring; 
                    // for instance, clicks on links are still processed. If you want to stop those behaviors, 
                    // see the preventDefault() method.
                    e.stopPropagation();

                    const visibility = map.getLayoutProperty(
                        clickedLayer,
                        'visibility'
                    );

                    // Toggle layer visibility by changing the layout object's visibility property.
                    // if it is currently visible, after the clicking, it will be turned off.
                    if (visibility === 'visible') {
                        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                        this.className = '';
                        title.innerHTML = 'Seattle, Washington'; // If no layer is visible set title to 'Seattle, Washington'
                        subtitle.innerHTML = 'With Generic Mapbox Basemap'; // If no layer is visible set subtitle to 'With generic mapbox basemap'
                    } else { //otherise, it will be turned on.
                        this.className = 'active';
                        map.setLayoutProperty(
                            clickedLayer,
                            'visibility',
                            'visible'
                        );
                        title.innerHTML = titles[link.textContent]; // Set title to the string in the titles array at index of layer.id
                        subtitle.innerHTML = subtitles[link.textContent]; // Set subtitle to the string in the titles array at index of layer.id
                    }
                };

                // in the menu place holder, insert the layer links.
                const layers = document.getElementById('menu');
                layers.appendChild(link);

            }
        });
        function myFunction() { // A simple function that is called to show map info when a button is clicked
                var x = document.getElementById("info");
                if (x.style.display === "none") {
                    x.style.display = "block";
                } else {
                    x.style.display = "none";
                }
            }