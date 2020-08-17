import webtor from '@webtor/platform-sdk-js';

const mocked = false;
const sdk = webtor({
    // apiUrl: 'https://167.99.109.146:31189',
    apiUrl: `${window.location.protocol == 'https:' ? 'https://' : 'http://'}167.99.109.146:31189`,
});

const expire = 60*60*24; // 24 hours

const getMagnet = hash => `magnet:?xt=urn:btih:${hash}`;

const isEpisode = (filename,episode) => 
    filename.toLocaleLowerCase().includes(`e${episode}`) ||
    filename.toLocaleLowerCase().includes(`episode ${episode}`)

const isVideo = path => path.endsWith("mp4") || path.endsWith("mkv")

const cleanUrl = (path, url) => {
    const extension = path.slice(path.length - 4, path.length);
    return url.split(extension)[0].concat(extension);
} 

const getTorrentUrl = async hash => mocked ? getMockedVideo() : new Promise(async (response, error) => {
    const torrent = await sdk.magnet.fetchTorrent(getMagnet(hash));
    sdk.torrent.push(torrent, expire);
    const seeder = sdk.seeder.get(torrent.infoHash);
    const filePath = torrent.files.find(file => isVideo(file.path)).path;
    const videoUrlStream = (await seeder.streamUrl(filePath)).href;
    filePath ? response((videoUrlStream)) : error("No video file found");
});

const getEpisodeFromPack = async (magnet, episode) => new Promise(async (response, error) => {
    const episodeString = (episode < 10 ? "0"+ episode : episode).toString();
    const torrent = await sdk.magnet.fetchTorrent(magnet);
    
    sdk.torrent.push(torrent, expire);
    const seeder = sdk.seeder.get(torrent.infoHash);
    const rawPath = torrent.files.find(file => isEpisode(file.path, episodeString) && isVideo(file.path));
    if (!rawPath) error("Video not found");
    const filePath = rawPath.path;
    const videoUrlStream = cleanUrl(filePath,(await seeder.streamUrl(filePath)).href);
    filePath ? response((videoUrlStream)) : error("No video file found");
});


export { getTorrentUrl, getEpisodeFromPack };


const getMockedVideo = () => new Promise(res => res('https://youtu.be/4N1iwQxiHrs?list=RDMMt2xOT9-DZGE'));