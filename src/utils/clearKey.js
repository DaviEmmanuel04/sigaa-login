const clearKey = (key) => {
    key = key.replace(/[àáâã]/g,"a");
    key = key.replace(/[èéê]/g,"e");
    key = key.replace(/[ìíî]/g,"i");
    key = key.replace(/[òóôõ]/g,"o");
    key = key.replace(/[ùúû]/g,"u");
    key = key.replaceAll(' ', '_')
    key = key.replace('.', '');
    key = key.replace(':', '')
    return key
}

module.exports = clearKey