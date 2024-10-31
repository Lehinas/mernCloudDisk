import dirLogo from "../assets/images/dirLogo.svg";
import fileLogo from "../assets/images/file.svg";
import pdfLogo from "../assets/images/pdfLogo.svg";
import imageLogo from "../assets/images/imageLogo.svg";
import videoLogo from "../assets/images/videoLogo.svg";

const logos = {
    pdf: pdfLogo,
    jpg: imageLogo,
    jpeg: imageLogo,
    png: imageLogo,
    mp4: videoLogo,
    dir: dirLogo,
};

export const getLogo = (type) => {
    if (type === "dir") return logos["dir"];
    return logos[type] || fileLogo;
};
