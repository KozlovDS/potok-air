"use client";

import { Button } from "../components/ui/button";
import { Container } from "../components/shared/container";
import { Title } from "../components/shared/title";
import { useRouter } from "next/navigation";

import Image from "next/image";
export default function NotFound() {
  const router = useRouter();
  return (
    <Container className="flex flex-col justify-center items-center">
      <Image src={"404.svg"} width={350} height={350} alt="404 Страница не найдена" />
      <Title text="Ошибка 404" size="lg" className="text-[90px] mb-4 font-semibold" />
      <p className="text-lg max-w-[400px] text-center text-secondary mb-10">Что-то пошло не так. Страница, которую вы запрашиваете, не существует.</p>
      <div className="flex gap-5 items-center">
        <Button variant={"secondary"} size={"sm"} onClick={() => router.push("/catalog")} className="text-lg">
          Каталог
        </Button>
        <span>или</span>
        <Button variant={"link"} size={"link"} onClick={() => router.push("/")}>
          На главную
        </Button>
      </div>
    </Container>
  );
}
