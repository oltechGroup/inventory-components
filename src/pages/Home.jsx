import { Button, Empty, EmptyDescription, EmptyImage, EmptyTitle } from 'keep-react'

function Home() {
  return (
    <Empty>
      <EmptyImage>
        <image
          src="https://staticmania.cdn.prismic.io/staticmania/499b23f3-41ed-4bc9-a9eb-43d13779d2f8_Property+1%3DSad+screen_+Property+2%3DSm.svg"
          height={234}
          width={350}
          alt="404"
        />
      </EmptyImage>
      <EmptyTitle className="mb-[14px] mt-5">Inventario Fuera de Servicio</EmptyTitle>
      <EmptyDescription className="mb-8">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.
      </EmptyDescription>
      <Button color="secondary" size="sm">Go to home</Button>
    </Empty>
  );
}

export default Home;
