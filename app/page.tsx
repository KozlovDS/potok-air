import { Button, Container } from "@/components/ui";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <div className="p-12 bg-accent rounded-lg text-white">
        <div className="container mx-auto flex flex-col gap-8 mobile:flex-row justify-between items-center">
          <div className="mobile:w-1/2 mb-10 mobile:mb-0">
            <h2 className="text-4xl font-bold leading-tight mb-4">
              OP Smart Heat Pump
            </h2>
            <p className="text-xl mb-4">
              Полностью инверторная сплит-система оснащена DC-инверторным
              компрессором и DC-инверторными вентиляторами наружного и
              внутреннего блоков.
            </p>
            <Button variant={"outline"} className="text-primary">
              Подробнее
            </Button>
          </div>
          <div className="mobile:w-1/2">
            <Image
              src="https://mdv-aircond.ru/upload/iblock/1cc/xbauipvi7k4n0kdibw3ks8a7rz2u2zeb.png"
              alt="Hero Image"
              className="w-full rounded-xl"
              priority
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
