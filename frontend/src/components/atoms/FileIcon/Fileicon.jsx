import { FaCss3, FaHtml5, FaJs, FaDocker } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { AiFillFileText } from "react-icons/ai"; // For .gitignore, .env files

export const FileIcon = ({ extension }) => {
  const iconStyle = {
    height: "20px",
    width: "20px",
  };

  const IconMapper = {
    js: <FaJs color="yellow" style={iconStyle} />,
    jsx: <GrReactjs color="#61dbfa" style={iconStyle} />,
    css: <FaCss3 color="#3c99dc" style={iconStyle} />,
    html: <FaHtml5 color="#e34c26" style={iconStyle} />,
    env: <AiFillFileText color="#000000" style={iconStyle} />, // .env files
    gitignore: <AiFillFileText color="#f05032" style={iconStyle} />, // .gitignore files
    dockerfile: <FaDocker color="#2496ed" style={iconStyle} />, // Dockerfile
    json: <AiFillFileText color="#f7f7f7" style={iconStyle} />, // For JSON files
  };

  return (
    <>
      {IconMapper[extension] || (
        <AiFillFileText color="#999" style={iconStyle} />
      )}
    </>
  );
};