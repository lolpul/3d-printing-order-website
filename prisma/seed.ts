import { PrismaClient, PortfolioStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      slug: "functional-parts",
      name: "Функциональные детали",
      description: "Крепления, корпуса, переходники и детали для ремонта.",
      sortOrder: 10
    },
    {
      slug: "prototypes",
      name: "Прототипы",
      description: "Проверка формы, посадки и эргономики до основной партии.",
      sortOrder: 20
    },
    {
      slug: "decor",
      name: "Декор и макеты",
      description: "Наглядные модели, сувениры и декоративные изделия.",
      sortOrder: 30
    }
  ];

  const materials = [
    {
      slug: "pla",
      name: "PLA",
      shortDescription: "Жесткий пластик для макетов и простых изделий.",
      description: "Подходит для прототипов, декоративных деталей и изделий без высокой тепловой нагрузки.",
      sortOrder: 10
    },
    {
      slug: "petg",
      name: "PETG",
      shortDescription: "Практичный материал для функциональных деталей.",
      description: "Более стойкий вариант для корпусов, креплений и деталей с умеренной нагрузкой.",
      sortOrder: 20
    },
    {
      slug: "tpu",
      name: "TPU",
      shortDescription: "Гибкий материал для эластичных изделий.",
      description: "Используется для накладок, демпферов и других гибких деталей при подходящей геометрии.",
      sortOrder: 30
    }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      create: category,
      update: category
    });
  }

  for (const material of materials) {
    await prisma.material.upsert({
      where: { slug: material.slug },
      create: material,
      update: material
    });
  }

  await prisma.siteSettings.upsert({
    where: { id: "site" },
    create: {
      id: "site",
      siteName: "3D Печать Воронеж",
      heroTitle: "3D-печать на заказ в Воронеже",
      city: "Воронеж",
      region: "Воронежская область",
      contactEmail: "hello@example.local",
      telegramUrl: "",
      avitoUrl: "",
      phoneNumber: "",
      deliveryText: "Самовывоз в Воронеже или отправка по России по согласованию.",
      defaultSeoTitle: "3D-печать на заказ в Воронеже",
      defaultSeoDescription:
        "Печать пластиковых деталей, корпусов, креплений, прототипов и небольших партий в Воронеже."
    },
    update: {}
  });

  const functional = await prisma.category.findUniqueOrThrow({ where: { slug: "functional-parts" } });
  const prototypes = await prisma.category.findUniqueOrThrow({ where: { slug: "prototypes" } });
  const pla = await prisma.material.findUniqueOrThrow({ where: { slug: "pla" } });
  const petg = await prisma.material.findUniqueOrThrow({ where: { slug: "petg" } });

  const items = [
    {
      slug: "korpus-dlya-elektroniki",
      title: "Корпус для электронного модуля",
      shortDescription: "Демо-кейс: компактный корпус с посадочными отверстиями и крышкой.",
      description:
        "Пример карточки портфолио для проверки структуры сайта. Реальные фотографии можно добавить через админ-панель.",
      clientTask: "Показать, как будет выглядеть работа в портфолио без загрузки внешних изображений.",
      result: "Карточка опубликована, используется встроенная заглушка изображения.",
      categoryId: functional.id,
      materialId: petg.id,
      color: "Черный",
      dimensions: "120 x 80 x 35 мм",
      quantity: "1 шт.",
      productionTime: "1-2 дня",
      status: PortfolioStatus.PUBLISHED,
      featured: true,
      featuredOrder: 10,
      publishedAt: new Date()
    },
    {
      slug: "prototip-krepleniya",
      title: "Прототип крепления",
      shortDescription: "Демо-кейс: быстрая проверка геометрии перед серией.",
      description:
        "Карточка показывает поля задачи, результата, материала и срока. Изображения можно заменить реальными после запуска.",
      clientTask: "Подготовить пример портфолио для локального MVP.",
      result: "Опубликованный пример доступен в портфолио и sitemap.",
      categoryId: prototypes.id,
      materialId: pla.id,
      color: "Белый",
      dimensions: "75 x 55 x 20 мм",
      quantity: "3 шт.",
      productionTime: "1 день",
      status: PortfolioStatus.PUBLISHED,
      featured: true,
      featuredOrder: 20,
      publishedAt: new Date()
    }
  ];

  for (const item of items) {
    await prisma.portfolioItem.upsert({
      where: { slug: item.slug },
      create: item,
      update: item
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
