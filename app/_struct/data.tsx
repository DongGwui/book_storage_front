export const bookList = [
    {
        id: 1,
        name: "book1",
        author: "김ㅇㅇ",
        thumbnail: "https://cover.millie.co.kr/service/cover/179634231/0264dcc178be4bf394b2c103ad2d9e7c.jpg?w=145&q=80",
        likes: 10,
        comments: 3
    }, {
        id: 2,
        name: "book2",
        author: "최ㅇㅇ",
        thumbnail: "",
        likes: 0,
        comments: 4
    },
    {
        id: 3,
        name: "book3",
        author: "이ㅇㅇ",
        thumbnail: "",
        likes: 3,
        comments: 10
    },
    {
        id: 4,
        name: "4book1",
        author: "김ㅇㅇ",
        thumbnail: "",
        likes: 10,
        comments: 3
    }, {
        id: 5,
        name: "5book2444444444444",
        author: "최ㅇㅇ",
        thumbnail: "",
        likes: 0,
        comments: 4
    },
    {
        id: 6,
        name: "6book3",
        author: "이ㅇㅇ",
        thumbnail: "",
        likes: 63,
        comments: 10
    },
    {
        id: 7,
        name: "7777book3",
        author: "이ㅇㅇ",
        thumbnail: "",
        likes: 6377,
        comments: 1077
    },    {
        id: 8,
        name: "book1",
        author: "김ㅇㅇ",
        thumbnail: "",
        likes: 10,
        comments: 3
    }, {
        id: 9,
        name: "book2",
        author: "최ㅇㅇ",
        thumbnail: "",
        likes: 0,
        comments: 4
    },
    {
        id: 10,
        name: "book3",
        author: "이ㅇㅇ",
        thumbnail: "",
        likes: 3,
        comments: 10
    },
    {
        id: 11,
        name: "4book1",
        author: "김ㅇㅇ",
        thumbnail: "",
        likes: 10,
        comments: 3
    }, {
        id: 12,
        name: "5book2444444444444",
        author: "최ㅇㅇ",
        thumbnail: "",
        likes: 0,
        comments: 4
    },
    {
        id: 13,
        name: "6book3",
        author: "이ㅇㅇ",
        thumbnail: "",
        likes: 63,
        comments: 10
    },
    {
        id: 14,
        name: "7777book3",
        author: "이ㅇㅇ",
        thumbnail: "",
        likes: 6377,
        comments: 1077
    },    {
        id: 15,
        name: "book1",
        author: "김ㅇㅇ",
        thumbnail: "",
        likes: 10,
        comments: 3
    }, {
        id: 16,
        name: "book2",
        author: "최ㅇㅇ",
        thumbnail: "",
        likes: 0,
        comments: 4
    },
    {
        id: 17,
        name: "book3",
        author: "이ㅇㅇ",
        thumbnail: "",
        likes: 3,
        comments: 10
    },
    {
        id: 18,
        name: "4book1",
        author: "김ㅇㅇ",
        thumbnail: "",
        likes: 10,
        comments: 3
    }, {
        id: 19,
        name: "5book2444444444444",
        author: "최ㅇㅇ",
        thumbnail: "",
        likes: 0,
        comments: 4
    },
    {
        id: 20,
        name: "6book3",
        author: "이ㅇㅇ",
        thumbnail: "",
        likes: 63,
        comments: 10
    },
    {
        id: 21,
        name: "7777book3",
        author: "이ㅇㅇ",
        thumbnail: "",
        likes: 6377,
        comments: 1077
    }
]

export type pagination = {
    page: number,
    limit: number
}

type book = {
    coverUrl: string,
    id: number,
    title: string
}

type user = {
    id: number,
    name: string
}

export type bookContent = {
    id: number,
    book: book,
    user: user
}