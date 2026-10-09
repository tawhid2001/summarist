import { Book } from "@/types/book";
import axios from "axios";
import { resolve } from "path";

const api = axios.create({
  baseURL: "https://us-central1-summaristt.cloudfunctions.net",
});

const BASE_URL = "https://us-central1-summaristt.cloudfunctions.net";

export async function getSelectedBook(): Promise<Book> {
  const response = await api.get<Book[]>("/getBooks?status=selected");
  const book = response.data[0];

  if(!book) {
    throw new Error("No selected book found");
  }

  return book;
}

export async function getRecommendedBooks(): Promise<Book[]> {
  const response = await api.get<Book[]>("/getBooks?status=recommended");

  return response.data;
}

export async function getSuggestedBooks(): Promise<Book[]> {
  const response = await api.get<Book[]>("/getBooks?status=suggested");

  return response.data;
}


export async function getBookById(id: string): Promise<Book> {
  const response = await api.get<Book>(`/getBook?id=${id}`);
  console.log("Book data:", response.data); // Log the book data for debugging
  return response.data;
}