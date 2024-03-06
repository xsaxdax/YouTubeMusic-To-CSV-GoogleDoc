const YouTubeMusicAPI = require('youtube-music-api');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const youtubeMusic = new YouTubeMusicAPI();

const BaseUrlSong='https://music.youtube.com/watch?v='

const BaseUrlArtist='https://music.youtube.com/channel/'

searchForSong()


const csvWriter = createCsvWriter({
    path: 'file.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'artist', title: 'ARTIST'}//,        {id:'length', title:'LENGTH'}
        
    ]
});

const rows=[]
 
async function searchForSong() {
    await youtubeMusic.initalize();
    youtubeMusic.ytcfg.VISITOR_DATA = '';

    
    const searchResult = await youtubeMusic.getPlaylist('PLCZnw7u5hU2uj0IDwR6PKROdBwMQ6eXje')
    .then(result => {
    
    
  
      for (const value of result.content) {
      
      //videoId the Id of the video https://music.youtube.com/watch?v=videoId
      //name:song name 
      //author.name : name of artist
      //author.browserId: link to artist https://music.youtube.com/channel/browserId
    console.log(value.name+ " "+value.author.name + " " + value.videoId + " " +value.author.browseId);
    let songHyperLink='HYPERLINK(${value.name}'   //rows.push({name: value.name, artist:value.author.name , song: value.videoId , authorLink:value.author.browseId}) 
    rows.push({name: songHyperLink, artist:value.author.name ,  authorLink:value.author.browseId}) 
    
  /* HYPERLINK("http://www.google.com/";"Google")*/
  }
  csvWriter.writeRecords(rows)       // returns a promise
    .then(() => {
        console.log('...Done');
    });

  
      })
    return null;
}
 