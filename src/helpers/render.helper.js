import constants from "./constants";

const renderImage = (imageUrl) => {
    if(imageUrl){
        return `${constants.IMAGE_BASE_URL}${imageUrl}`
    }
    return constants.DEFAULT_IMAGE;
}

export {
    renderImage
}