"use server";
import { z } from "zod";
import { loginSchema, registerPatientSchema, registerDoctorSchema, userSchema } from "../schemas";
import { BASE_URL } from "../constants";
import { catchError } from "@/lib/utils";
import { cookies } from "next/headers";
import axios from "axios";

export const login = async (data: z.infer<typeof loginSchema>) => {
  const safeData = loginSchema.parse(data);
  try {
    const res = await axios.post(`${BASE_URL}Authentication/Login`, safeData);

    console.log(res);
    if (res.data.token) {
      cookies().set("token", res.data.token);
      cookies().set("id", res.data.id);
    }

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Login failed");
  }
};
export const register = async (
  data: z.infer<typeof registerPatientSchema | typeof registerDoctorSchema>,
  role: "patient" | "doctor"
) => {
  const schema = role === "patient" ? registerPatientSchema : registerDoctorSchema;
  console.log(data);
  const safeData = schema.parse(data);
  console.log(safeData);
  return catchError(async () => {
    const res = await axios.post(
      `${BASE_URL}Authentication/${role === "patient" ? "RegisterPatient" : "RegisterDoctor"}`,
      safeData
    );
    console.log(res);

    return res.data;
  });
};
export const updateUser = async (data: z.infer<typeof userSchema>) => {
  return catchError(async () => {
    const res = await fetch(`${BASE_URL}Authentication/UpdateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Update failed");
    }
    const result = await res.json();
    console.log(result);
    return result;
  });
};

export const getEntities = async (entityName: "Specialization" | "Patient" | "Doctor", id?: string) => {
  return catchError(async () => {
    const res = id ? await fetch(`${BASE_URL}/${entityName}/${id}`) : await fetch(`${BASE_URL}/${entityName}`);
    if (!res.ok) {
      throw new Error("Get Entities failed");
    }
    const result = await res.json();
    console.log(result);
    return result;
  });
};
export const search = async (
  name: string,
  filters: { SpecializationId?: string; GovernorateId?: string; Gender?: string }
) => {
  return catchError(async () => {
    const res = await fetch(
      `${BASE_URL}/Doctor/search?Name=${name}&SpecializationId=${filters.SpecializationId}&GovernorateId=${filters.GovernorateId}
      &Gender=${filters.Gender}`
    );
    if (!res.ok) {
      throw new Error("Search failed");
    }
    const result = await res.json();
    console.log(result);
    return result;
  });
};
export const adminData = async (data: "dashboard" | "doctors" | "doctor") => {
  return catchError(async () => {
    const res = await fetch(`${BASE_URL}Admin`);
    if (!res.ok) {
      throw new Error("Get Entities failed");
    }
    const result = await res.json();
    console.log(result);
    return result;
  });
};
