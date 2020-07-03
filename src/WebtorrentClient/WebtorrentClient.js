import webtor from '@webtor/platform-sdk-js';

const mocked = true;

const sdk = webtor({
    apiUrl: 'http://192.168.99.100:31046',
});

const expire = 60*60*24; // 24 hours

const getMagnet = hash => `magnet:?xt=urn:btih:${hash}`;

const getTorrentUrl = async hash => mocked ? getMockedVideo() : new Promise(async (response, error) => {
    const torrent = await sdk.magnet.fetchTorrent(getMagnet(hash));
    await sdk.torrent.push(torrent, expire);
    const seeder = sdk.seeder.get(torrent.infoHash);
    const filePath = torrent.files.find(file => file.path.endsWith("mp4") || file.path.endsWith("mkv")).path;
    const videoUrlStream = (await seeder.streamUrl(filePath)).href;
    filePath ? response((videoUrlStream)) : error("No video file found");
});


export { getTorrentUrl };


const getMockedVideo = () => new Promise(res => res('https://youtu.be/4N1iwQxiHrs?list=RDMMt2xOT9-DZGE'));