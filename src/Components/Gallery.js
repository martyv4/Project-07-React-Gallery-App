import React, { Component } from 'react';
//import the variable apiKey from config.js
import apiKey from './config';

//import our Components to be displayed in this render
import Photo from './Photo';
import NotFound from './NotFound';
import Loading from './Loading';

class Gallery extends Component {
  constructor () {
    //execute default constructor
    super();

    //default state: photos empty array, isLoading boolean true
    this.state = {
      photos: [],
      isLoading: true
    };
  }

  fetchPhotos = (query) => {
    //when loading the page, empty the state variables
    //so the render will show default state while the images load
    this.setState({ photos: [], isLoading: true });

    //construct uri for Flickr - embed the API key, tags equal to query term, 24 items per page, 1st page of content, JSON format
    const uri = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=yourkey&tags=searchterm&per_page=24&page=1&format=json&nojsoncallback=1".replace("yourkey", apiKey).replace("searchterm", query);

    //same but include specification in extras parameter to request url_o, url_z, url_c - different sizes for the images (when available per image)
    //const uri = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=yourkey&tags=searchterm&extras=url_o,url_z,url_c&per_page=24&page=1&format=json&nojsoncallback=1".replace("yourkey", apiKey).replace("searchterm", query);

    //same but embed the variables in the string using ${}
    //const uri = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&extras=url_o,url_z,url_c&per_page=24&page=1&format=json&nojsoncallback=1`;

    //same but build the string with concatenation
    //const uri = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + apiKey + "&tags=" + query + "&extras=url_o,url_z,url_c&per_page=24&page=1&format=json&nojsoncallback=1`;

    //HTTP GET the URI, convert the response data to JSON, assign the photos state variable and set state isLoading to false, signifying the photos are loaded
    fetch(uri)
    .then(response => response.json())
    .then(responseData => {
      this.setState({ photos: responseData.photos.photo, isLoading: false });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  //https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js
  //https://www.flickr.com/services/api/misc.urls.html

  //construct the photo URI for this particular JSON photo item: use the flickr format, display using the Photo Component
  mapJsonToPhotoComponents = (photo, i) => {
    let uri = '';
    /* if (photo.url_z != null)
      uri = photo.url_z;
    else if (photo.url_c != null)
      uri = photo.url_c;
    else if (photo.url_o != null)
      uri = photo.url_o;
    else */
      uri = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    return <Photo src={uri} key={i}/>;
  }

  /*
  mapJsonToPhotoComponents = (photo) => {
    const uri = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;
    return <Photo src={uri} />;
  }
  */

  //when the Gallery component mounts (fully loads), run fetchPhotos to get the photos for params 'type'
  //type being the text in /gallery/:type
  componentDidMount() {
    this.fetchPhotos(this.props.match.params.type);
  }

  //if this page route has changed, fetch the photos for that new type
  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      this.fetchPhotos(this.props.match.params.type);
    }
}

 render() {
   let images = [];
   let content ='';

   //if the photos aren't loading, display the name
   if (!this.state.isLoading)
   {
    content = "Displaying " + this.props.match.params.type;
   }
   //if the photos array has content display them
    if (this.state.photos.length > 0)
    {
      images = this.state.photos.map(this.mapJsonToPhotoComponents);
    }
    //if there are no photos in the array, and the isLoading is false, then this must be an empty search: load NotFound component
      else if (!this.state.isLoading)
      {
      images = <NotFound/>;
      }
      //otherwise, display the generic Loading panel
      else
      {
        images = <Loading/>;
      }
      //render the photo-container with the content and images variables within
    return <div className="photo-container"><h2>{content}</h2><ul>{images}</ul></div>;
 }
}

export default Gallery;