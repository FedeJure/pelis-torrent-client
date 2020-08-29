const mapToSubtitleData = sub => {
    return {
        label: sub.lang,
        srcLang: sub.langcode,
        kind: "subtitles",
        src: sub.vtt,
        crossOrigin: "anonymous"
    }
}

const mapToSubtitlesList = subs => {
    return Object.keys(subs).map(key => mapToSubtitleData(subs[key]))
}

export { mapToSubtitlesList }