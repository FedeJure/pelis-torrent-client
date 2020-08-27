import webtor from '@webtor/platform-sdk-js';

const mocked = false;
const sdk = webtor({
    // apiUrl: 'https://167.99.109.146:31189',
    apiUrl: `${window.location.protocol == 'https:' ? 'https://' : 'http://'}167.99.109.146:31189`,
});

const expire = 60*60*24; // 24 hours

const getMagnet = hash => `magnet:?xt=urn:btih:${hash}`;

const isEpisode = (filename,episode) => {
    const ep = parseInt(episode.toString());
    return filename.toLocaleLowerCase().match(new RegExp("e"+ep+"[^0-9]", "g")) ||
    filename.toLocaleLowerCase().match(new RegExp("e"+ep+"$", "g")) ||
    filename.toLocaleLowerCase().match(new RegExp("e0"+ep, "g")) ||
    filename.toLocaleLowerCase().match(new RegExp("episode "+ep+"[^0-9]", "g")) ||
    filename.toLocaleLowerCase().match(new RegExp("episode "+ep+"$", "g")) ||
    filename.toLocaleLowerCase().match(new RegExp("episode "+ep, "g")) ||
    filename.toLocaleLowerCase().match(new RegExp("x"+ep+"[^0-9]", "g")) ||
    filename.toLocaleLowerCase().match(new RegExp("x"+ep+"$", "g")) ||
    filename.toLocaleLowerCase().match(new RegExp("x"+ep, "g")) ||
    filename.toLocaleLowerCase().match(new RegExp("x0"+ep+"[^0-9]", "g")) ||
    filename.toLocaleLowerCase().match(new RegExp("x0"+ep+"$", "g")) ||
    filename.toLocaleLowerCase().match(new RegExp("x0"+ep, "g"))
}
    

const isVideo = path => path.endsWith("mp4") || path.endsWith("mkv") || path.endsWith("avi")

const isSubtitle = path => path.endsWith("srt") || path.endsWith("vtt");

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
    const subtitles = await getOpenSubtitles(seeder, filePath);
    filePath ? response(({url: videoUrlStream, subtitles })) : error("No video file found");
});

const getSubtitlesOfSerie = async (files, seeder, episode) => {
    const subtitlesFiles = files
        .filter(file => isEpisode(file.path, episode) && isSubtitle(file.path));
    const subtitles = await Promise.all(subtitlesFiles.map(file => seeder.url(file.path)))
    const streamableSubtitles = await Promise.all(
        [...(subtitles.map(sub => seeder.streamUrl(subtitles[0].href))),
        ...(subtitles.map(sub => seeder.openSubtitles(subtitles[0].href)))]
    );
    return streamableSubtitles.map(sub => ({
        url: sub.href,
        languageName: "Original"
    }));
}

const getOpenSubtitles = async (seeder, path) => {
    return (await seeder.openSubtitles(path))
            .filter(s => s.srclang == "es" || s.srclang == "en")
            .map(s => ({srcLang: s.srclang,
                        kind: "subtitles",
                        src: s.src.href,
                        label: s.label,
                        crossOrigin: "anonymous"
                    }))
}

const getEpisodeFromPack = async (magnet, episode) => new Promise(async (response, error) => {
    const episodeString = (episode < 10 ? "0"+ episode : episode).toString();
    const torrent = await sdk.magnet.fetchTorrent(magnet);
    
    sdk.torrent.push(torrent, expire);
    const seeder = sdk.seeder.get(torrent.infoHash);
    console.log(torrent.files)
    const rawPath = torrent.files.find(file => isEpisode(file.path, episodeString) && isVideo(file.path));

    // const subtitles = await getSubtitlesOfSerie(torrent.files, seeder, episode);
    if (!rawPath) {
        error("Video not found");
        return;
    }
    const filePath = rawPath.path;
    const subtitles = await getOpenSubtitles(seeder, filePath);
    const videoUrlStream = cleanUrl(filePath,(await seeder.streamUrl(filePath)).href);
    filePath ? response({
        videoUrl: videoUrlStream,
        subtitles: subtitles
    }) : error("No video file found");
});


export { getTorrentUrl, getEpisodeFromPack };


const getMockedVideo = () => new Promise(res => res('https://youtu.be/4N1iwQxiHrs?list=RDMMt2xOT9-DZGE'));