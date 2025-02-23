import { Button } from "../components/ui";
import { Container, Title } from "../components/ui";

import Image from "next/image";
import Link from "next/link";
export default function NotFound() {
  return (
    <Container className="flex flex-col justify-center items-center">
      <Image
        src={"/404.svg"}
        width={380}
        height={380}
        alt="404 Страница не найдена"
      />
      <Title text="Ошибка 404" size="h1" className="mb-4 font-semibold" />
      <p className="text-lg max-w-[400px] text-center text-secondary mb-10">
        Что-то пошло не так. Страница, которую вы запрашиваете, не существует.
      </p>
      <div className="flex gap-5 items-center">
        <Link href={"/catalog"}>
          <Button variant={"secondary"} size={"sm"} className="text-lg">
            Каталог
          </Button>
        </Link>
        <span>или</span>
        <Link href={"/"}>
          <Button variant={"link"} size={"link"}>
            На главную
          </Button>
        </Link>
      </div>
    </Container>
  );
}
