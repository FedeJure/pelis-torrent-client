const allowedLanguages = [
    'es',
    'en'
];

const mapToSubtitleData = sub => {
    return {
        label: sub.lang,
        srcLang: sub.langcode,
        kind: "subtitles",
        src: sub.vtt,
        crossOrigin: "anonymous"
    }
}

const filterSubtitles = sub => {
    return allowedLanguages.includes(sub.srcLang)
}

const mapToSubtitlesList = subs => {
    const response = []
    Object.keys(subs).forEach(key =>{
        if (!subs[key].length) response.push(mapToSubtitleData(subs[key]))
        else response.push(...(subs[key].map(mapToSubtitleData)))
    })
    return response.filter(filterSubtitles);
}

export { mapToSubtitlesList }