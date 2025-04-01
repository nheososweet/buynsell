export type IProvince = {
    id: string;
    code: string;
    level_name?: string;
    name: string
}

export type IDistrict = {
    id: string;
    code: string;
    level_name?: string;
    name: string;
    province_code: string
}

export type IWard = {
    id: string;
    code: string;
    level_name?: string;
    name: string;
    district_code: string;
    province_code: string;
}