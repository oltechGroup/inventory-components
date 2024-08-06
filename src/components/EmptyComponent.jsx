import { Empty, EmptyImage, EmptyTitle } from "keep-react";

function EmptyComponent({ message }) {
  return (
    <Empty>
      <EmptyImage>
        <img
          src="https://staticmania.cdn.prismic.io/staticmania/7c82d76e-be06-41ca-a6ef-3db9009e6231_Property+1%3DFolder_+Property+2%3DSm.svg"
          height={234}
          width={350}
          alt="404"
        />
      </EmptyImage>
      <EmptyTitle className="mb-[14px] mt-5">{message}</EmptyTitle>
    </Empty>
  );
}

export default EmptyComponent;
