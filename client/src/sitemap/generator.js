import { sitemapBuilder as buildSitemap } from 'react-router-sitemap';
import Routes from '../components/body/Body';
import path from 'path'; // add path which will be needed for file write
import fs from 'fs'; // import file system object

// include dev and production enviorenments with variables
const hostname = 'https://improve-skills.herokuapp.com'; 
// define our destination folder and sitemap file name
const dest = path.resolve('./public', 'sitemap.xml');
const sitemap = buildSitemap(hostname, routes);
// write sitemap.xml file in /public folder
// Access the sitemap content by converting it with .toString() method
fs.writeFileSync(dest, sitemap.toString());
