export const gender = [
    { id: "M", label: "Nam" },
    { id: "F", label: "Nữ" },
    { id: "U", label: "Không xác định" },
];

export const getGenderLabel = (value: string) => {
    const genderMap = new Map(gender.map(g => [g.id, g.label]));
    return genderMap.get(value) || "Không xác định";
};