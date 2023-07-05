export const groups = [
    {
        "id": 1,
        "title": "Group Task 1",
        "created_by": "1",
        "created_at": "2022-12-24T04:50:37.704Z",
        "updated_at": "2022-12-24T04:50:37.704Z",
        "description": "June - Desember"
    },
    {
        "id": 2,
        "title": "Group Task 2",
        "created_by": "1",
        "created_at": "2022-12-24T06:30:55.783Z",
        "updated_at": "2022-12-24T06:30:55.783Z",
        "description": "Januari - Februari"
    },
]

export const items = {
    1: [
        {
            id: 1,
            name: "Re-designed the zero-g doggie bags. No more spills!",
            done: null,
            todo_id: 1,
            created_at: "2021-04-21T00:12:06.116Z",
            updated_at: "2021-04-21T00:12:06.116Z",
            progress_percentage: 100,
        },
        {
            id: 2,
            name: "Redesign page part 2",
            done: null,
            todo_id: 1,
            created_at: "2021-04-21T00:14:38.397Z",
            updated_at: "2021-04-21T00:14:38.397Z",
            progress_percentage: 60,
        },
    ],
};

export const colors = {
    NEUTRAL: {
        _10: "#FFFFFF",
        _20: "#FAFAFA",
        _30: "#EDEDED",
        _40: "#E0E0E0",
        _70: "#757575",
        _90: "#404040",
        _100: "#1D1F20",
        BORDER: "#EDEDED",
    },
    PRIMARY: {
        MAIN: "#01959F",
        BORDER: "#4DB5BC",
        SURFACE: "#F7FEFF",
    },
    SECONDARY: {
        BORDER: "#FEEABC",
        PRESSED: "#FA9810",
        SURFACE: "#FFFCF5",
    },
    DANGER: {
        BORDER: "#F5B1B7",
        SURFACE: "#FFFAFA",
        MAIN: "#E11428",
    },
    SUCCESS: {
        BORDER: "#B8DBCA",
        SURFACE: "#F8FBF9",
        MAIN: "#43936C",
    },
};