import React from 'react'
import LoadingBanner, { PRIMARY_LIGHT } from '../loadingBanner/LoadingBanner'
import './SourceSelector.css'

const getQuality = source => {
    const qualities = ['420p', '720p', '1080p', '2160p', '4k', '4320p', '8k']
    var quality = '???'
    qualities.forEach(q => {
        if (source.includes(q)) quality = q
    })
    return quality
}

const SourceSelector = ({ sources, onSelect, verifiedSources }) => (
    <div className="sourceSelector">
        {verifiedSources && verifiedSources.length > 0 && <><p className="sourceSelectorTitle">Verified Sources:</p>
        <div className="sourceSelectorContainer">
            {verifiedSources.length == 0 && (
                <LoadingBanner color={PRIMARY_LIGHT} opacity={0.2} />
            )}
            {verifiedSources
                .map((source, i) => (
                    <div
                        className="source"
                        key={i}
                        onClick={() => onSelect(source)}
                    >
                        <p>{source.title}</p>
                    </div>
                ))}
        </div></>}
        <p className="sourceSelectorTitle">Sources:</p>
        <div className="sourceSelectorContainer">
            {sources.length == 0 && (
                <LoadingBanner color={PRIMARY_LIGHT} opacity={0.2} />
            )}

            {sources
                .map(s => ({
                    title: s.title,
                    quality: getQuality(s.title),
                    magnet: s.magnet,
                }))
                .map(s => ({ ...s, title: s.title.replace(s.quality, '') }))
                .sort((s1, s2) =>
                    s2.title.includes('YTS') || s1.quality === '???' ? 1 : -1
                )
                .map((source, i) => (
                    <div
                        className="source"
                        key={i}
                        onClick={() => onSelect(source)}
                    >
                        <p>{source.title}</p>
                        <span>{source.quality}</span>
                    </div>
                ))}
        </div>
    </div>
)

export default SourceSelector
