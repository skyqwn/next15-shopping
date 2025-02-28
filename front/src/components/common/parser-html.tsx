import parse from "html-react-parser";

const ParserHtml = ({ dirtyHtml }: { dirtyHtml: string }) => {
  return <div>{parse(dirtyHtml)}</div>;
};

export default ParserHtml;
