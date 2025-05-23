"use server";
import { Container } from "@prisma/client";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function saveContainer(
  bindedData: {
    container: Container;
    selectedFirmId: string;
  },
  prevState: { message: string[] | null },
  formData: FormData
) {
  console.log("bindedData", bindedData);
  console.log("formData", formData);

  await prisma.container.update({
    where: { id: bindedData.container.id },
    data: { ...bindedData.container, firmId: bindedData.selectedFirmId },
  });

  revalidatePath("/firma-harita");

  return { message: null };
}
