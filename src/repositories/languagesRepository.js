const repoKey = "languages";

const getLanguages = () => {
    return  JSON.parse(localStorage.getItem(repoKey)) || [];
}

const saveLanguages = languages => {
    localStorage.setItem(repoKey, JSON.stringify(languages));
}

export default { getLanguages, saveLanguages};