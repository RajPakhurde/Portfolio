export const projects = [
  {
    title: "AutoSphere",
    description:
      "A full-stack vehicle resale platform with role-based workflows for Admin, Buyer, and Seller, engineered using an Event-Driven Microservices Architecture with a decoupled .NET (C#) notification service.",
    highlight: "Integrated RabbitMQ (via Docker) for asynchronous communication between Spring Boot monolith and .NET service, ensuring non-blocking APIs and high fault tolerance.",
    tech: ["Java", "Spring Boot", "C# .NET", "RabbitMQ", "MySQL", "React.js", "Redux"],
    image: "/projects/autosphere.png",
    github: "https://github.com/orgs/0825-PGKDAC-PROJECT-MYGAADI-2-0/repositories",
    demo: null,
  },
  {
    title: "ExamSync",
    description:
      "A cross-platform desktop application to automate exam cell operations and academic workflows including student data management, exam scheduling, hall ticket generation, and result processing.",
    highlight: "Designed and handled structured datasets with 2000+ student records efficiently, implementing automated PDF generation for hall tickets.",
    tech: ["React.js", "Express.js", "Electron.js", "SQLite"],
    image: "/projects/examsync.png",
    github: "https://github.com/RajPakhurde/AcademiaSuite",
    demo: null,
  },
];
