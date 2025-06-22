export interface University {
    uni_id: number;
    uni_name_kz: string;
    uni_name_rus: string;
    uni_short_kz: string;
    uni_short_rus: string;
    uni_status: string;
    uni_adress: string;
    uni_website: string;
    uni_phone_number: string;
    uni_email: string;
    uni_whatsapp: string;
    uni_code: string;
    students_number: number;
    ent_min: number;
    qs_rate: string;
    logo_path: string;
    gallery_path: string;
    cookies: number;
    uni_description: string;
    created_at: string; 
    updated_at: string; 
    deleted_at: string | null; 
}

export interface Specialty {
    spec_id: number;
    uni_id: number;
    spec_name_kz: string;
    spec_name_rus: string;
    spec_code: string;
    spec_type: string;
    description: string;
    ent_score: number;
    created_at: string; 
    updated_at: string; 
    deleted_at: string | null; 
}

export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    role: string;
    email: string;
    password: string;
    university_id: number | null;
    created_at: string; 
    updated_at: string; 
    deleted_at: string | null; 
}

export interface OopStatistic {
    oop_id: number;
    user_id: number;
    year: number;
    ent_score: number;
    created_at: string; 
    updated_at: string; 
    deleted_at: string | null; 
}