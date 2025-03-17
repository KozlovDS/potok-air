import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MaskedInput from "react-text-mask";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Имя должно состоять минимум из 2 символов.",
  }),
  phone: z
    .string()
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Некорректный формат номера"),
  email: z.string().email({
    message: "Введите корректный email.",
  }),
  city: z.string().min(1, {
    message: "Введите город.",
  }),
});

interface Props {
  className?: string;
  productName: string;
  productModel: string;
}

export const RequestForm: React.FC<Props> = ({ productName, productModel }) => {
  const [requestStatus, setRequestStatus] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      phone: "",
      email: "",
      city: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      const payload = {
        ...data, // Данные формы
        productName,
        productModel,
      };

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.status === 200) {
        setIsLoading(false);
        setRequestStatus(true);
      }
      form.reset();
    } catch (error) {
      setIsLoading(false);
      alert(`Ошибка отправки формы: ${error}`);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 flex flex-col h-full justify-center items-center">
        <Image
          src="/loader.svg"
          alt="request"
          width={182}
          height={182}
          className="mx-auto"
        />
      </div>
    );
  }

  if (requestStatus) {
    return (
      <div className="space-y-6 flex flex-col h-full justify-center items-center">
        <Image
          src="/success-message.svg"
          alt="success"
          width={154}
          height={154}
          className="mx-auto w-auto"
        />
        <h3 className="text-[40px] mb-4">Спасибо за заявку!</h3>
        <p className="mb-[40] text-secondary text-center">
          Ваша завка принята в обработку. Мы свяжемся с вами в ближайшее время.
        </p>
        <Link href="/catalog" className="flex items-center gap-2">
          <Button variant={"secondary"}>Перейти в каталог</Button>
        </Link>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col h-full"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Иван Иванович" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <MaskedInput
                  mask={(rawValue) => {
                    if (!rawValue) return []; // Предотвращаем ошибку с `undefined`
                    return [
                      "+",
                      "7",
                      " ",
                      "(",
                      /\d/,
                      /\d/,
                      /\d/,
                      ")",
                      " ",
                      /\d/,
                      /\d/,
                      /\d/,
                      "-",
                      /\d/,
                      /\d/,
                      "-",
                      /\d/,
                      /\d/,
                    ];
                  }}
                  showMask={true}
                  value={field.value}
                  onFocus={(e) => {
                    if (!e.target.value) {
                      field.onChange("+7 (___) ___-__-__");
                    }
                  }}
                  onClick={(e) => {
                    setTimeout(() => {
                      const input = e.target as HTMLInputElement;
                      const value = input.value;
                      // Ищем первую позицию символа заполнителя "_"
                      const underscorePos = value.indexOf("_");
                      const pos =
                        underscorePos !== -1 ? underscorePos : value.length;
                      input.setSelectionRange(pos, pos);
                    }, 0);
                  }}
                  onChange={(e) => field.onChange(e.target.value)}
                  render={(ref, props) => (
                    <Input
                      ref={(input) => ref(input as HTMLElement)}
                      {...props}
                      placeholder="+7 (999) 999-99-99"
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input placeholder="ivanov@mail.ru" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Город</FormLabel>
              <FormControl>
                <Input placeholder="Москва" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex-grow content-end">
          <Button
            type="submit"
            variant="secondary"
            className="w-full h-16 mb-4"
            disabled={isLoading}
          >
            Отправить
          </Button>
          <p className="font-medium">
            Нажимая кнопку Отправить, вы подтверждаете свое согласие на{" "}
            <Link
              href="/privacy-policy"
              className="text-accent underline underline-offset-2"
              target="_blank"
            >
              обработку персональных данных
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};
