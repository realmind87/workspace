import { ImageProps } from "./types"

const Component: React.FC<ImageProps> = ({src, width, height, alt=""}) => {

    const ImageSrc = src
    
    return (
        <img src={ImageSrc} alt={alt} />
    )
}

export default Component