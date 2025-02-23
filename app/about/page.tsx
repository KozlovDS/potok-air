import { ContactsInfo, Container, Title } from "@/components/ui";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <Container className="mb-8">
        <Title size="h1" text="Контакты" />
        <div className="bg-white rounded-lg overflow-hidden grid grid-cols-[minmax(320px,33%)_1fr]">
          <div className="min-w-80 p-10 flex flex-col gap-8">
            <ContactsInfo
              title="Адрес"
              content="141533, Московская область, Солнечногорский район, дер.Безверхово, д.13"
            />
            <ContactsInfo
              title="Режим работы"
              content="Пн - Пт: 9:00 - 21:00, Сб - Вс: 10:00 - 19:00"
            />
            <ContactsInfo title="Телефон" content="+7 (999) 999-99-99" />
            <ContactsInfo title="Почта" content="mail@shop.ru" />
          </div>
          <div>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.246841%2C56.110953&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgozNDIzNDA1NDg5EpQB0KDQvtGB0YHQuNGPLCDQnNC-0YHQutC-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0LPQvtGA0L7QtNGB0LrQvtC5INC-0LrRgNGD0LMg0KHQvtC70L3QtdGH0L3QvtCz0L7RgNGB0LosINC00LXRgNC10LLQvdGPINCR0LXQt9Cy0LXRgNGF0L7QstC-LCAxMyIKDXn8FEIV83FgQg%2C%2C&z=18.25"
              width={560}
              height={400}
              allowFullScreen={true}
              className="w-full h-full"
            />
          </div>
        </div>
      </Container>
      <Container className="bg-white rounded-md p-10">
        <Title size="h2" text="Учетная каточка" className="mb-4" />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                Полное наименование компании
              </TableCell>
              <TableCell>
                Общество с ограниченной ответственностью «Поток»
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Сокращенное наименование компании
              </TableCell>
              <TableCell>ООО «Поток»</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">ИНН</TableCell>
              <TableCell>5044099282</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">КПП</TableCell>
              <TableCell>504401001</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">ОГРН</TableCell>
              <TableCell>1165044052612</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">ОКПО</TableCell>
              <TableCell>05126036</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Юридический адрес</TableCell>
              <TableCell>
                141533, Московская область, Солнечногорский район,
                дер.Безверхово, д.13
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Банковский счет</TableCell>
              <TableCell>
                ПАО СБЕРБАНК г. Москва
                <br />
                БИК 044525225
                <br />
                К/С 30101810400000000225
                <br />
                Р/С 40702810838000126027
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">
                Генеральный директор
              </TableCell>
              <TableCell>Качалова Татьяна Юрьевна</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Главный бухгалтер</TableCell>
              <TableCell>Качалова Татьяна Юрьевна</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Почтовый адрес</TableCell>
              <TableCell>
                141533, Московская область, Солнечногорский район,
                дер.Безверхово, д.13
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default AboutPage;
