import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const baseUrl = process.env.BASE_URL; // Получаем базовый URL из переменной окружения
  const product = await fetch(`${baseUrl}/api/product?id=${id}`).then((res) =>
    res.json()
  ); // Используем полный URL

  return {
    title: product.name,
  };
}

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
