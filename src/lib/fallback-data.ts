import type { PortfolioStatus } from "@prisma/client";

export const fallbackCategories = [
  { id: "cat-fixtures", name: "Крепления и держатели", slug: "krepleniya", description: "Практичные детали для монтажа и фиксации.", sortOrder: 1 },
  { id: "cat-caps", name: "Заглушки и переходники", slug: "zaglushki", description: "Небольшие детали для ремонта и аккуратной сборки.", sortOrder: 2 },
  { id: "cat-cases", name: "Корпуса", slug: "korpusa", description: "Корпуса и панели для электроники и прототипов.", sortOrder: 3 },
  { id: "cat-auto", name: "Автомобильные детали", slug: "avtodetali", description: "Пластиковые элементы, возможность изготовления оценивается индивидуально.", sortOrder: 4 },
  { id: "cat-prototypes", name: "Прототипы", slug: "prototipy", description: "Пробные образцы перед серией или сборкой.", sortOrder: 5 },
  { id: "cat-decor", name: "Декоративные изделия", slug: "dekor", description: "Аккуратные изделия для интерьера и подарков.", sortOrder: 6 },
  { id: "cat-repair", name: "Ремонтные детали", slug: "remontnye-detali", description: "Замена сломанных пластиковых элементов.", sortOrder: 7 },
  { id: "cat-small-series", name: "Мелкие серии", slug: "melkie-serii", description: "Небольшие партии одинаковых изделий.", sortOrder: 8 }
];

export const fallbackMaterials = [
  {
    id: "mat-pla",
    name: "PLA",
    slug: "pla",
    shortDescription: "Жёсткий пластик для прототипов и декоративных изделий.",
    description: "PLA подходит для макетов, декоративных изделий и деталей без высокой тепловой нагрузки.",
    sortOrder: 1
  },
  {
    id: "mat-petg",
    name: "PETG",
    slug: "petg",
    shortDescription: "Более стойкий пластик для функциональных деталей.",
    description: "PETG часто выбирают для креплений, корпусов и деталей, которым нужна повышенная ударная стойкость.",
    sortOrder: 2
  },
  {
    id: "mat-tpu",
    name: "TPU",
    slug: "tpu",
    shortDescription: "Гибкий материал для эластичных элементов.",
    description: "TPU используют для гибких накладок, прокладок, демпферов и похожих задач.",
    sortOrder: 3
  }
];

export const fallbackPortfolio = [
  {
    id: "demo-holder",
    title: "Держатель датчика для прототипа",
    slug: "derzhatel-datchika-dlya-prototipa",
    shortDescription: "Небольшое крепление для проверки посадки детали в сборке.",
    description:
      "Демонстрационная работа без фотографии. Такая карточка показывает, как будет выглядеть опубликованная работа после загрузки реальных снимков через административную панель.",
    clientTask: "Подготовить крепление по размерам и проверить геометрию перед установкой.",
    result: "Получилась аккуратная деталь для примерки и дальнейшей доработки модели.",
    color: "Чёрный",
    dimensions: "до 80 мм по длинной стороне",
    quantity: "1 шт.",
    productionTime: "обычно оценивается после просмотра модели",
    status: "PUBLISHED" as PortfolioStatus,
    featured: true,
    featuredOrder: 1,
    seoTitle: null,
    seoDescription: null,
    publishedAt: new Date("2026-01-01T00:00:00Z"),
    createdAt: new Date("2026-01-01T00:00:00Z"),
    updatedAt: new Date("2026-01-01T00:00:00Z"),
    categoryId: "cat-fixtures",
    materialId: "mat-petg",
    category: fallbackCategories[0],
    material: fallbackMaterials[1],
    images: []
  },
  {
    id: "demo-cap",
    title: "Техническая заглушка по размерам",
    slug: "tehnicheskaya-zaglushka-po-razmeram",
    shortDescription: "Пример небольшой ремонтной детали, которую можно изготовить по образцу.",
    description:
      "Заглушки, переходники и простые корпуса можно оценивать по чертежу, фотографии с размерами или физическому образцу.",
    clientTask: "Заменить отсутствующую пластиковую заглушку без точного заводского чертежа.",
    result: "Форма уточняется по месту, итоговая точность зависит от исходных данных.",
    color: "Серый",
    dimensions: "",
    quantity: "несколько штук",
    productionTime: "после согласования модели",
    status: "PUBLISHED" as PortfolioStatus,
    featured: true,
    featuredOrder: 2,
    seoTitle: null,
    seoDescription: null,
    publishedAt: new Date("2026-01-02T00:00:00Z"),
    createdAt: new Date("2026-01-02T00:00:00Z"),
    updatedAt: new Date("2026-01-02T00:00:00Z"),
    categoryId: "cat-caps",
    materialId: "mat-pla",
    category: fallbackCategories[1],
    material: fallbackMaterials[0],
    images: []
  }
];
