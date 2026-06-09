import { useSearchParams } from "react-router";

const defaultSizes = "16,24,32,48,64,96,128";

interface ICardProps {
  imageCss: Record<string, string>;
  size: number;
  url: string;
}

function IconCard({ imageCss, size, url }: ICardProps) {
  return (
    <div className="flex flex-col items-center lg:items-end">
      <img
        alt={`${size} for ${url}`}
        src={url}
        style={{ ...imageCss, width: `${size}pt`, height: `${size}pt` }}
      />
      <p>{`${size}`}</p>
    </div>
  );
}

interface IProps {
  display: string;
  imageCss: Record<string, string>;
  url: string;
}

function getSizes(urlSizes: string): number[] {
  if (!/[0-9]+(,[0-9]+)*/.test(urlSizes)) {
    urlSizes = defaultSizes;
  }

  const strSizes = urlSizes.split(",");
  return strSizes.map((size) => parseInt(size, 10));
}

function IconList({ display, imageCss, url }: IProps) {
  const [searchParams] = useSearchParams();
  const sizes = getSizes(searchParams.get("sizes") || defaultSizes);

  return (
    <div
      className="flex flex-col gap-4 lg:static lg:flex-row lg:gap-12 items-center"
      style={{ display }}
    >
      {sizes.map((size) => (
        <IconCard imageCss={imageCss} key={size} size={size} url={url} />
      ))}
    </div>
  );
}

export { IconList };
