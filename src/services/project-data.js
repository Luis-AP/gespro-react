const projectsData = {
    projects: [
        {
            id: 1,
            title: "Proyecto 1",
            repository_url: "https://github.com",
            is_group: false,
            status: "OPEN",
            professor: "Profesor X",
            created_at: "2021-10-15",
            updated_at: "2021-10-15",
            members: [
                {
                    id: 1,
                    first_name: "John",
                    last_name: "Doe",
                },
            ],
        },
        {
            id: 2,
            title: "Proyecto 2",
            repository_url: "https://github.com",
            is_group: true,
            status: "READY",
            professor: "Profesor Y",
            created_at: "2021-10-15",
            updated_at: "2021-10-15",
            members: [
                {
                    id: 1,
                    first_name: "John",
                    last_name: "Doe",
                },
                {
                    id: 2,
                    first_name: "Jane",
                    last_name: "Doe",
                },
                {
                    id: 3,
                    first_name: "Alice",
                    last_name: "Pickles",
                },
            ],
        },
        {
            id: 3,
            title: "Proyecto 3",
            repository_url: "https://github.com",
            is_group: false,
            status: "GRADED",
            professor: "Profesor Z",
            grade: 10,
            created_at: "2021-10-15",
            updated_at: "2021-10-15",
            members: [
                {
                    id: 1,
                    first_name: "John",
                    last_name: "Doe",
                },
            ],
        },
    ],
};

export default projectsData;
