# srtm-rgbify
A repository to convert srtm 1 arc second DEM into vector tile. 

# directories
## src 
The directory where SRTM data is saved



# js files 

* list test
    * prep-list01.js: listing of the file in the src directory
    * prep-list02.js: reading file from config

* prep test
    * prep0.js: reading file name from geojson (srtm data extent)
    * prep4.js: list the srtm files for certain module (e.g. z-x-y)
    * prep5.js: module list is treated as object because it could contain the list of srtm files
    * prep6.js: previous one was refined.


* spawn test
    * spawn-test00.js: test of gdal_merge with nodejs
    * spawn-test01.js: test of gdal_merge into rasterio rgbify with nodejs

* JS for converstion
    * index4merge-re.js: to merge src files for each modules at ZL6.
    * index4rgb: convert merged file into rgbified raster tile
