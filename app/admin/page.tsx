"use client";

import AddProductPage from "@/components/shared/admin/add-product-page";
import { Container } from "@/components/ui";
import { LogOut, ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/check").then((res) => {
      if (res.ok) setLoading(false);
      else router.push("/login");
    });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    router.push("/login");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="flex gap-10">
      <div className="flex flex-col w-96 h-auto">
        <div className="space-y-3 sticky top-4 rounded-md p-3 bg-white">
          <div className="flex-1">
            <ul className="flex flex-col pt-2 pb-4 space-y-1 text-sm w-full">
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <ShoppingBasket />
                  <span>Продукты</span>
                </a>
              </li>
              <li className="rounded-sm justify-self-end">
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <LogOut />
                  <span>Выйти</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <AddProductPage />
      </div>
    </Container>
  );
}
