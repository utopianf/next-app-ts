type Doctor = {id: number, name: string, department: string, img_path: string|null}

export type Hospital = {
    id: number;
    name: string;
    address: string;
    prefecture: string;
    email: string;
    cancer: string[];
    surgery: number|null;
    surgery_date: string|null;
    bed: number;
    bed_date: string;
    private_room: number|null;
    lower_private_room_price: number|null;
    upper_private_room_price: number|null;
    treatment: string[];
    doctors: Doctor[];
    img_path: string;
}


export const hospital: Hospital[] = [
    {
        id: 1,
        name: "相模原協同病院",
        address: "神奈川県相模原市緑区橋本台4-3-1",
        prefecture: "神奈川",
        email: "j-kokido@kanagawa.kouseiren.net",
        cancer: ["肺がん", "胃がん", "大腸がん", "前立腺がん", "乳がん", "肝臓がん"],
        surgery: 514,
        surgery_date: "2020.04～2021.03",
        bed: 400,
        bed_date: "2021/9/8",
        private_room: 91,
        lower_private_room_price: 6160,
        upper_private_room_price: 16940,
        treatment: ["腹腔鏡下手術", "内視鏡的手術", "乳房再建", "乳房同時再建", "サルベージ療法（救済手術）", "小線源治療", "トリモダリティ治療", "化学放射線療法", "腹腔内化学療法", "免疫療法", "緩和ケア", "リンパ浮腫治療"],
        doctors: [
            {
                "id": 7000078,
                "name": "鈴木　繁紀",
                "department": "呼吸器外科",
                "img_path": "/image/sagamihara-doctor1.png"
            },
            {
                "id": 7000079,
                "name": "山本　倫子",
                "department": "呼吸器内科",
                "img_path": null
            },
        ],
        img_path: "/image/sagamihara.jpg"
    },
    {
        id: 2,
        name: "順天堂大学医学部附属練馬病院",
        address: "東京都練馬高野台３－１－１０",
        prefecture: "東京都",
        email: "drokubo@juntendo-nerima.jp",
        cancer: ["肝臓がん"],
        surgery: 177,
        surgery_date: "2020/1/1~2020/12/31",
        bed: 490,
        bed_date: "2021/9/17",
        private_room: 41,
        lower_private_room_price: 24200,
        upper_private_room_price: 66000,
        treatment: ["ラジオ波焼灼療法", "肝動脈化学塞栓療法", "薬物療法"],
        doctors: [
            {
                "id": 7000080,
                "name": "大久保裕直",
                "department": "消化器内科",
                "img_path": "/image/zyuntendodaigakunerima-doctor1.jpg"
            },
        ],
        img_path: "/image/zyuntendodaigakunerima.png"
    },
]

export const tiiki = {
    "tokyo": "東京都",
    "kanagawa": "神奈川県",
    "ittosanken": "１都３県",
}

export const gan = {
    "breast": "乳がん",
    "colorectal": "大腸がん",
    "lung": "肺がん",
    "prostate": "前立腺がん",
    "stomach": "胃がん",
    "liver": "肝臓がん",
}
