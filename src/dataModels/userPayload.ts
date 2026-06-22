export interface createUserPayload{
    name: string;
    job: string;
    email: string;
    skills: string[];
    address?: Address;
}

export interface updateUserPayload{
    name?: string;
    job?: string;
    email?: string;
    skills?: string[];
    address?: Address;
}

export interface Address{
        street: string;
        city: string;
        state: string;
        zip: string;
}