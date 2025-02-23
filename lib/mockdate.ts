import {
  Products,
  ProductImages,
  ProductModels,
  ProductCharacteristics,
  ProductDocuments,
  ProductSpecification,
  ProductAdvantages,
  ProductFunctions,
  ProductFunctionsCategory,
} from "@prisma/client";

export const MENU_LIST = [
  { name: "Главная", link: "/" },
  { name: "Каталог", link: "/catalog" },
  { name: "О нас", link: "/about" },
  { name: "Доставка", link: "/delivery" },
];

export const categories = [
  {
    name: "Бытовые",
    subCategories: [
      {
        name: "Инверторные",
        link: "#",
      },
      {
        name: "Тепловые насосы",
        link: "#",
      },
      {
        name: "On/Off сплит-системы",
        link: "#",
      },
    ],
  },
  {
    name: "Мультисплит",
    subCategories: [
      {
        name: "Наружные блоки",
        link: "#",
      },
      {
        name: "Настенные внутренние блоки",
        link: "#",
      },
      {
        name: "Кассетные внутренние блоки",
        link: "#",
      },
      {
        name: "Канальные внутренние блоки",
        link: "#",
      },
      {
        name: "Консольные внутренние блоки",
        link: "#",
      },
    ],
  },
  {
    name: "Полупромышленные",
    subCategories: [
      {
        name: "Кассетные сплит-системы",
        link: "#",
      },
      {
        name: "Полупромышленные канальные кондиционеры",
        link: "#",
      },
      {
        name: "Напольно-потолочные",
        link: "#",
      },
      {
        name: "Колонные",
        link: "#",
      },
    ],
  },
  {
    name: "Чиллеры",
    subCategories: [
      {
        name: "Воздухоохлаждаемые",
        link: "#",
      },
      {
        name: "Водоохлаждаемые",
        link: "#",
      },
      {
        name: "Специальные",
        link: "#",
      },
    ],
  },
];

export const products: Products[] = [
  {
    id: 1,
    name: "OP Smart Heat Pump",
    description:
      "Полностью инверторная сплит-система оснащена DC-инверторным компрессором и DC-инверторными вентиляторами наружного и внутреннего блоков. Благодаря увеличенным теплообменникам, встроенному EXV-клапану и экологичному фреону R32 кондиционер способен обогревать помещение при температуре наружного воздуха до -30°С. Высочайший класс энергоэффективности А+++ означает, что оборудование будет работать не только эффективно, но и экономично. Внутренний блок поставляется с двухступенчатой системой очистки воздуха и биполярным ионизатором. Система поддерживает удаленное управление по Wi-Fi сети (опция).",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/1cc/300_200_1619711fa078991f0a23d032687646b21/xbauipvi7k4n0kdibw3ks8a7rz2u2zeb.png",
    subCategoryId: 1,
    videoLink: "https://mdv-aircond.ru/upload/video/video_review_OP.mp4",
  },
  {
    id: 2,
    name: "Тепловые насосы Nomad Tumbler",
    description: "Описание 2",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/6b3/300_200_1619711fa078991f0a23d032687646b21/s26c945h1moy69xrulj6ngy3yunn753k.png",
    subCategoryId: 1,
    videoLink: "",
  },
  {
    id: 3,
    name: "On/Off сплит-системы Focus Paper Refill",
    description: "Описание 3",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/0e0/300_200_1619711fa078991f0a23d032687646b21/vmpd33xplrctmkj1ylg8jevli4btr9gu.png",
    subCategoryId: 1,
    videoLink: "",
  },
  {
    id: 4,
    name: "Наружные блоки Machined Mechanical Pencil",
    description: "Описание 4",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/67c/300_200_1619711fa078991f0a23d032687646b21/oluwgwcs5swd6gibd76s243icrv22qix.png",
    subCategoryId: 1,
    videoLink: "",
  },
  {
    id: 5,
    name: "Настенные внутренние блоки Earthen Bottle",
    description: "Описание 5",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/1cc/300_200_1619711fa078991f0a23d032687646b21/xbauipvi7k4n0kdibw3ks8a7rz2u2zeb.png",
    subCategoryId: 1,
    videoLink: "",
  },
  {
    id: 6,
    name: "Кассетные внутренние блоки Nomad Tumbler",
    description: "Описание 6",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/6b3/300_200_1619711fa078991f0a23d032687646b21/s26c945h1moy69xrulj6ngy3yunn753k.png",
    subCategoryId: 2,
    videoLink: "",
  },
  {
    id: 7,
    name: "Канальные внутренние блоки Focus Paper Refill",
    description: "Описание 7",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/0e0/300_200_1619711fa078991f0a23d032687646b21/vmpd33xplrctmkj1ylg8jevli4btr9gu.png",
    subCategoryId: 2,
    videoLink: "",
  },
  {
    id: 8,
    name: "Консольные внутренние блоки Machined Mechanical Pencil",
    description: "Описание 8",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/67c/300_200_1619711fa078991f0a23d032687646b21/oluwgwcs5swd6gibd76s243icrv22qix.png",
    subCategoryId: 3,
    videoLink: "",
  },
  {
    id: 9,
    name: "Кассетные сплит-системы Earthen Bottle",
    description: "Описание 9",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/1cc/300_200_1619711fa078991f0a23d032687646b21/xbauipvi7k4n0kdibw3ks8a7rz2u2zeb.png",
    subCategoryId: 3,
    videoLink: "",
  },
  {
    id: 10,
    name: "Полупромышленные канальные кондиционеры Nomad Tumbler",
    description: "Описание 10",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/6b3/300_200_1619711fa078991f0a23d032687646b21/s26c945h1moy69xrulj6ngy3yunn753k.png",
    subCategoryId: 3,
    videoLink: "",
  },
  {
    id: 11,
    name: "Напольно-потолочные Focus Paper Refill",
    description: "Описание 11",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/0e0/300_200_1619711fa078991f0a23d032687646b21/vmpd33xplrctmkj1ylg8jevli4btr9gu.png",
    subCategoryId: 11,
    videoLink: "",
  },
  {
    id: 12,
    name: "Колонные Machined Mechanical Pencil",
    description: "Описание 12",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/67c/300_200_1619711fa078991f0a23d032687646b21/oluwgwcs5swd6gibd76s243icrv22qix.png",
    subCategoryId: 12,
    videoLink: "",
  },
  {
    id: 13,
    name: "Воздухоохлаждаемые Earthen Bottle",
    description: "Описание 13",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/1cc/300_200_1619711fa078991f0a23d032687646b21/xbauipvi7k4n0kdibw3ks8a7rz2u2zeb.png",
    subCategoryId: 13,
    videoLink: "",
  },
  {
    id: 14,
    name: "Водоохлаждаемые Nomad Tumbler",
    description: "Описание 14",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/6b3/300_200_1619711fa078991f0a23d032687646b21/s26c945h1moy69xrulj6ngy3yunn753k.png",
    subCategoryId: 14,
    videoLink: "",
  },
  {
    id: 15,
    name: "Специальные Focus Paper Refill",
    description: "Описание 15",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/0e0/300_200_1619711fa078991f0a23d032687646b21/vmpd33xplrctmkj1ylg8jevli4btr9gu.png",
    subCategoryId: 15,
    videoLink: "",
  },
];

export const productImages: ProductImages[] = [
  {
    id: 1,
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/1cc/700_500_1619711fa078991f0a23d032687646b21/xbauipvi7k4n0kdibw3ks8a7rz2u2zeb.png",
    productId: 1,
  },
  {
    id: 2,
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/uf/a80/700_500_1619711fa078991f0a23d032687646b21/mxfcilmm301r2tsxm2q51frljjyxikbd.png",
    productId: 1,
  },
  {
    id: 3,
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/uf/2e5/700_500_1619711fa078991f0a23d032687646b21/mfsvxtk3wrgvggsscqkk3g1nsy8jujac.png",
    productId: 1,
  },
  {
    id: 4,
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/uf/bc0/700_500_1619711fa078991f0a23d032687646b21/9t44k3ldu5kkqxdsj551ty6n80l1yj21.png",
    productId: 1,
  },
  {
    id: 5,
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/uf/ae2/700_500_1619711fa078991f0a23d032687646b21/x42uoz2ed10tytp3vlgxqte05kzr3skn.png",
    productId: 1,
  },
  {
    id: 6,
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/uf/eff/700_500_1619711fa078991f0a23d032687646b21/6aa6vxuaxvruda1042q1wytluq03w5sw.png",
    productId: 1,
  },
];

export const productModels: ProductModels[] = [
  {
    id: 1,
    name: "MDSOPS-09HRFN8 MDOOPS-09HFN8",
    productId: 1,
    price: 116700,
  },
  {
    id: 2,
    name: "MDSOPS-12HRFN8 MDOOPS-12HFN8",
    productId: 1,
    price: 130900,
  },
  {
    id: 3,
    name: "MDSOPS-18HRFN8 MDOOPS-18HFN8",
    productId: 1,
    price: 187500,
  },
];

export const productCharacteristics: ProductCharacteristics[] = [
  {
    id: 1,
    name: "Тип управления компрессором",
    value: "3D DC-Inverter",
    productModelId: 1,
  },
  {
    id: 2,
    name: "Номинальная холодопроизводительность, кВт",
    value: "2,63 (1,03 - 4,81)",
    productModelId: 1,
  },
  {
    id: 3,
    name: "Номинальная теплопроизводительность, кВт",
    value: "2,92 (0,75 - 7,19)",
    productModelId: 1,
  },
  {
    id: 4,
    name: "Уровень шума внутреннего блока, дБ(А)",
    value: "42,5/35/22",
    productModelId: 1,
  },
  {
    id: 5,
    name: "Уровень шума наружного блока, дБ(А)",
    value: "59",
    productModelId: 1,
  },
  {
    id: 11,
    name: "Электропитание, В/Гц/Ф",
    value: "220-240/50/1",
    productModelId: 1,
  },
  {
    id: 12,
    name: "Кабель питания, мм²",
    value: "3х1,5",
    productModelId: 1,
  },
  {
    id: 13,
    name: "Тип компрессора",
    value: "Ротационный",
    productModelId: 1,
  },
  {
    id: 6,
    name: "Тип управления компрессором",
    value: "3D DC-Inverter",
    productModelId: 2,
  },
  {
    id: 7,
    name: "Номинальная холодопроизводительность, кВт",
    value: "3,51 (1,03 - 4,81)",
    productModelId: 2,
  },
  {
    id: 8,
    name: "Номинальная теплопроизводительность, кВт",
    value: "3,80 (0,75 - 7,19)",
    productModelId: 2,
  },
  {
    id: 9,
    name: "Уровень шума внутреннего блока, дБ(А)",
    value: "42,5/35/22",
    productModelId: 2,
  },
  {
    id: 10,
    name: "Уровень шума наружного блока, дБ(А)",
    value: "59",
    productModelId: 2,
  },
  {
    id: 6,
    name: "Тип управления компрессором",
    value: "3D DC-Inverter",
    productModelId: 3,
  },
  {
    id: 7,
    name: "Номинальная холодопроизводительность, кВт",
    value: "4,97 (1,93 - 5,47)",
    productModelId: 3,
  },
  {
    id: 8,
    name: "Номинальная теплопроизводительность, кВт",
    value: "5,56 (1,28 - 7,23)",
    productModelId: 3,
  },
  {
    id: 9,
    name: "Уровень шума внутреннего блока, дБ(А)",
    value: "43/36,5/33",
    productModelId: 3,
  },
  {
    id: 10,
    name: "Уровень шума наружного блока, дБ(А)",
    value: "59",
    productModelId: 3,
  },
];

export const productDocuments: ProductDocuments[] = [
  {
    id: 1,
    name: 'Каталог Бытовые и полупромышленные системы кондиционирования MDV" 2024',
    productId: 1,
    url: "https://mdv-aircond.ru/upload/iblock/6aa/6aa6vxuaxvruda1042q1wytluq03w5sw.pdf",
  },
  {
    id: 2,
    name: "Руководство по установке сплит-системы MDV серии OP Smart Heat Pump",
    productId: 1,
    url: "https://mdv-aircond.ru/upload/iblock/6aa/6aa6vxuaxvruda1042q1wytluq03w5sw.pdf",
  },
  {
    id: 3,
    name: "Руководство по эксплуатации сплит-системы MDV серии OP Smart Heat Pump",
    productId: 1,
    url: "https://mdv-aircond.ru/upload/iblock/6aa/6aa6vxuaxvruda1042q1wytluq03w5sw.pdf",
  },
  {
    id: 4,
    name: "Инструкция по Wi-fi и голосовому управлению кондиционерами MDV",
    productId: 1,
    url: "https://mdv-aircond.ru/upload/iblock/6aa/6aa6vxuaxvruda1042q1wytluq03w5sw.pdf",
  },
];

export const productSpecifications: ProductSpecification[] = [
  {
    id: 1,
    name: "Класс энергоэффективности A+++",
    imageUrl: "classA+++.svg",
  },
  {
    id: 2,
    name: "ERP 3D DC-Inverter",
    imageUrl: "erp.svg",
  },
  {
    id: 3,
    name: "Эффективный обогрев при низких температурах",
    imageUrl: "30C.svg",
  },
  {
    id: 4,
    name: "Беспроводной ПДУ в комплекте",
    imageUrl: "du.png",
  },
  {
    id: 5,
    name: "Гарантия 4 года",
    imageUrl: "4age.svg",
  },
];

export const productAdvantages: ProductAdvantages[] = [
  {
    id: 1,
    name: "Работа в режиме обогрева даже при -35°С",
    description:
      "Передовые инверторные технологии, специально спроектированный фреоновый контур, подогрев поддона наружного блока, специальный алгоритм защиты от обмерзания обеспечивают бесперебойную работу теплового насоса OP Smart Heat Pump при температуре наружного воздуха от -35°С.",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/8b5/1920_700_1619711fa078991f0a23d032687646b21/fwfq2ue6bn5gvnxhe46bqth8jjpd58h6.png",
    productId: 1,
  },
  {
    id: 2,
    name: "Области применения",
    description:
      "Тепловой насос «воздух-воздух» эффективная система для отопления и кондиционирования загородного дома круглый год. Идеальное решение для строений, где нет возможности подвести газовое отопление или выделить место под котельную. ",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/7df/975_617_1619711fa078991f0a23d032687646b21/nt6fk2vo4jnsld9jdsgkkzql0s19qsi3.png",
    productId: 1,
  },
  {
    id: 3,
    name: "Функция Breeze Away",
    description:
      "Активация функции Breeze Away позволяет мягко охладить помещение, предотвращая обдув пользователя. В этом режиме кондиционер устанавливает положение жалюзи горизонтально и вентилятор внутреннего блока вращается с минимальной скоростью. Таким образом охлажденный воздух плавно распространяется вдоль потолка и опускается вниз. При этом доступно регулирование скорости вентилятора и температуры.",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/024/975_617_1619711fa078991f0a23d032687646b21/3vydd99mhgf20cc0hephvhrpd921u0dt.png",
    productId: 1,
  },
  {
    id: 4,
    name: "Функция «Радар»",
    description:
      "Интеллектуальное управление системой осуществляется с помощью радиолокационной системы. Радар может обнаруживать действия людей в помещении. В режиме охлаждения и обогрева, когда вы отсутствуете в течение 30 минут, устройство автоматически понижает производительность для экономии энергии.",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/128/1920_700_1619711fa078991f0a23d032687646b21/8or911ftj3u3xbtvd9syo5y96ztoz76c.png",
    productId: 1,
  },
  {
    id: 5,
    name: "Функция Follow Me",
    description:
      "Функция FOLLOW ME помогает создать комфортные условия в помещении и разумно расходовать электроэнергию. При активации этой функции кондиционер отслеживает температуру в помещении с помощью датчика, который расположен в пульте дистанционного управления. Если пользователь положит пульт рядом с собой, то комфортная температура будет обеспечена непосредственно в той части комнаты, где он находится.",
    imageUrl:
      "https://mdv-aircond.ru/upload/resize_cache/iblock/a18/975_617_1619711fa078991f0a23d032687646b21/uy531timw9dheggpqtj2maan992v7zui.png",
    productId: 1,
  },
];

export const functionsItem: ProductFunctions[] = [
  {
    id: 1,
    name: "Радар",
    description:
      "Интеллектуальное управление системой осуществляется с помощью радиолокационной системы. Радар может обнаруживать действия людей в помещении. В режиме охлаждения и обогрева, когда вы отсутствуете в течение 30 минут, устройство автоматически понижает производительность для экономии энергии.",
    categoryId: 1,
  },
  {
    id: 2,
    name: "Функция 2",
    description: "Описание функции 2",
    categoryId: 1,
  },
  {
    id: 3,
    name: "Функция 3",
    description: "Описание функции 3",
    categoryId: 2,
  },
];

export const functionsCategory: ProductFunctionsCategory[] = [
  {
    id: 1,
    name: "Здоровье и комфорт",
  },
  {
    id: 2,
    name: "Функциональность",
  },
];
